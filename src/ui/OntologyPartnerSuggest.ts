/** Native input adapter for the existing ontology string matcher. The caller supplies eligible
 * physical fields and owns assignment; this adapter only renders bounded native suggestions. */
import {AbstractInputSuggest,type App} from 'obsidian';
import {fuzzyFilterStrings} from './FuzzySearchInput';

export class OntologyPartnerSuggest extends AbstractInputSuggest<string> {
  /** Attach one native input; no vault or graph inventory is acquired. */
  constructor(app:App,input:HTMLInputElement,private readonly fields:()=>readonly string[],private readonly choose:(field:string)=>void){super(app,input);this.limit=24;}
  /** Reuse the composer matcher against the current reciprocal-role eligibility projection. */
  protected getSuggestions(query:string):string[]{return fuzzyFilterStrings(this.fields(),query,this.limit);}
  /** Native rows use the owning document and physical field spelling. */
  renderSuggestion(field:string,element:HTMLElement):void {element.setText(field);}
  /** Accept only a still-eligible native choice; closing cannot retarget another editor. */
  selectSuggestion(field:string):void {if(this.fields().includes(field)){this.setValue(field);this.choose(field);}this.close();}
}
