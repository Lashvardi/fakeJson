import { Pipe, PipeTransform } from '@angular/core';
import * as Prism from 'prismjs';

import 'prismjs/components/prism-typescript.min.js';

@Pipe({
  name: 'highlightInterface',
})
export class HighlightInterfacePipe implements PipeTransform {
  transform(value: string, language: string = 'typescript'): string {
    if (!Prism.languages[language]) {
      console.error(`Prism does not support this language: ${language}`);
      return value;
    }
    const grammar = Prism.languages[language];
    const code = Prism.highlight(value, grammar, language);
    return code;
  }
}
