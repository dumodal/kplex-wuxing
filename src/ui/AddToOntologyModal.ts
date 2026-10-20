/** Native role/pair editor over the shared configuration validator and queued ontology writer.
 * The shell owns only optional partner selection, busy/generation fences and recoverable feedback;
 * fields, roles and persistence remain with the plugin and settings-only projection. */
import {Modal,Notice,Setting,type ButtonComponent,type DropdownComponent,type TextComponent} from 'obsidian';
import type KplexPlugin from '../main';
import {normalizeFieldName} from '../core/contracts/fieldName';
import {ontologyConfiguration,eligibleOntologyPartners,ONTOLOGY_RECIPROCAL,type OntologyRole,type OntologyConfiguration} from '../core/contracts/ontologyConfiguration';
import {OntologyPartnerSuggest} from './OntologyPartnerSuggest';

export type OntologyAssignmentRole=OntologyRole;

export class AddToOntologyModal extends Modal {
  private opened=false;
  private busy=false;
  private committed=false;
  private generation=0;
  private selected:OntologyAssignmentRole='child';
  private partner='';
  private opening:OntologyConfiguration|null=null;
  private current:()=>boolean=()=>false;
  private saveButton:ButtonComponent|null=null;
  private roleControl:DropdownComponent|null=null;
  private partnerControl:TextComponent|null=null;
  private partnerRow:Setting|null=null;
  private resolutionRow:Setting|null=null;
  private feedback:HTMLElement|null=null;
  private suggestions:OntologyPartnerSuggest|null=null;

  /** Capture the actual field and native close callbacks; opening a dialog never assigns a role. */
  constructor(private plugin:KplexPlugin,private fieldName:string,private onSaved?:()=>void,private onClosed?:()=>void){super(plugin.app);}

  /** Render the existing direction/Save/Cancel flow with one optional reciprocal-field input. */
  onOpen():void {
    this.opened=true;this.committed=false;this.generation++;
    const translate=this.plugin.translator;this.opening=ontologyConfiguration(this.plugin.settings);
    this.current=this.plugin.receivedSettingsOwner('hierarchy');
    this.selected=this.plugin.ontologyRoleForField(this.fieldName)??'child';
    this.partner=this.opening.pairs.get(normalizeFieldName(this.fieldName))?.partner??'';
    this.setTitle(translate('ontology.addTitle',{field:this.fieldName}));
    this.contentEl.createEl('p',{text:translate('ontology.chooseRoleHelp'),cls:'setting-item-description'});
    new Setting(this.contentEl).setName(translate('ontology.relationshipRole')).addDropdown(/** Direction changes never silently move or clear the chosen partner. */ dropdown=>{
      this.roleControl=dropdown;
      const labels:Record<OntologyAssignmentRole,string>={parent:translate('role.parent'),child:translate('role.child'),left:translate('role.friendLeft'),right:translate('role.challengerRight'),previous:translate('role.previous'),next:translate('role.next'),hidden:translate('role.hidden'),excluded:translate('role.excludedMetadata')};
      for(const [role,label] of Object.entries(labels))dropdown.addOption(role,label);
      dropdown.setValue(this.selected).onChange(/** Eligibility changes immediately; incompatible selections require explicit resolution. */ value=>{this.selected=value as OntologyAssignmentRole;this.suggestions?.close();this.refresh();});
    });
    this.partnerRow=new Setting(this.contentEl).setName(translate('ontology.pairWith')).setDesc(translate('ontology.pairOptionalHelp')).addText(/** Native text and the existing matcher share physical field values only. */ text=>{
      this.partnerControl=text;text.setValue(this.partner).setPlaceholder(translate('ontology.pairNone'));
      text.inputEl.setAttribute('aria-label',translate('ontology.pairWith'));
      text.onChange(/** Typed values remain local until one explicit Save. */ value=>{this.partner=value;this.refresh();});
      this.suggestions=new OntologyPartnerSuggest(this.app,text.inputEl,/** Each query rechecks current reciprocal assignments and pairing ownership. */ ()=>this.eligible(),/** A native choice cannot complete into a retired or pending form. */ field=>{if(this.opened&&!this.busy){this.partner=field;this.refresh();}});
    });
    this.feedback=this.contentEl.createEl('p',{cls:'mod-warning',attr:{role:'alert'}});
    this.resolutionRow=new Setting(this.contentEl).addButton(/** Hidden/Excluded have no partner input, so an incompatible old pair has an explicit clear action. */ button=>button.setButtonText(translate('ontology.clearPair')).onClick(/** Clearing retains both fields as ordinary assignments when saved. */ ()=>{if(!this.busy){this.partner='';this.partnerControl?.setValue('');this.refresh();}}));
    new Setting(this.contentEl).addButton(/** One pending submission owns persistence independently of modal dismissal. */ button=>{this.saveButton=button;button.setButtonText(translate('common.save')).setCta().onClick(/** Capture current controls only after local eligibility validation. */ ()=>{void this.save();});})
      .addButton(/** Cancel and native Escape never submit the unaccepted form. */ button=>button.setButtonText(translate('common.cancel')).onClick(/** Close only this native shell. */ ()=>this.close()));
    this.refresh();
  }

  /** Never offer incompatible roles, the edited field or someone else's paired counterpart. */
  private eligible():string[]{return eligibleOntologyPartners(ontologyConfiguration(this.plugin.settings),this.fieldName,this.selected);}

  /** An empty pair leaves ordinary assignment unchanged; a typed pair must be an exact eligible field. */
  private valid():boolean {return !this.partner.trim()||this.eligible().some(/** Matching uses the canonical field normalization. */ field=>normalizeFieldName(field)===normalizeFieldName(this.partner.trim()));}

  /** Keep native controls, inline feedback and the explicit hidden-pair resolution in sync. */
  private refresh():void {
    const valid=this.valid(),pairable=Boolean(ONTOLOGY_RECIPROCAL[this.selected]);
    this.partnerRow?.settingEl.toggle(pairable);
    this.resolutionRow?.settingEl.toggle(!valid);
    if(this.feedback){this.feedback.setText(valid?'':this.plugin.translator('ontology.pairIncompatible'));this.feedback.toggle(!valid);}
    this.saveButton?.setDisabled(this.busy||this.committed||!valid);
    this.roleControl?.setDisabled(this.busy);this.partnerControl?.setDisabled(this.busy);
  }

  /** Revalidate both fields inside the common queue; stale/failed saves keep this draft recoverable. */
  private async save():Promise<void> {
    if(!this.opened||this.busy||this.committed||!this.opening)return;
    if(!this.valid()){this.refresh();return;}
    this.busy=true;this.refresh();const generation=this.generation;
    try {
      const result=await this.plugin.assignFieldToOntology(this.fieldName,this.selected,this.partner.trim()||null,this.opening,this.current);
      if(!this.opened||this.generation!==generation)return;
      this.committed=true;
      if(result?.refreshPending)new Notice(this.plugin.translator('styles.operation.savedRefreshPending'));
      this.onSaved?.();this.close();
    }catch(error){
      if(this.opened&&this.generation===generation&&this.feedback){this.feedback.setText(this.plugin.translator(this.committed?'styles.operation.savedRefreshPending':error instanceof Error&&error.name==='SettingsValidationError'?'ontology.pairInvalid':error instanceof Error&&error.name==='SettingsConflictError'?'settings.ontology.conflict':'styles.operation.notSaved'));this.feedback.toggle(true);}
    }finally{this.busy=false;if(this.opened&&this.generation===generation){this.saveButton?.setDisabled(this.committed||!this.valid());this.roleControl?.setDisabled(this.committed);this.partnerControl?.setDisabled(this.committed);}}
  }

  /** Retire suggestions and exact invocation once; an accepted disk operation remains accepted. */
  onClose():void {
    const notify=this.opened;this.opened=false;this.suggestions?.close();this.suggestions=null;
    this.saveButton=null;this.roleControl=null;this.partnerControl=null;this.partnerRow=null;this.resolutionRow=null;this.feedback=null;this.opening=null;
    this.contentEl.empty();if(notify)this.onClosed?.();
  }
}
