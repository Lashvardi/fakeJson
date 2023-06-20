import { Pipe, PipeTransform } from '@angular/core';
import * as Prism from 'prismjs';

import 'prismjs/components/prism-json.min.js';
@Pipe({
  name: 'highlightJSON'
})
export class HighlightJSONPipe implements PipeTransform {

  transform(value: string, language: string = 'json'): string {
    if (!Prism.languages[language]) {
      console.error(`Prism does not support this language: ${language}`);
      return value;
    }
    const grammar = Prism.languages[language];
    const code = Prism.highlight(value, grammar, language);
    return code;
  }

}
