import {HtmlResponse, RenderTemplateEvent, RenderTemplateEventListener} from '@byteshift/harmony';
import {Service}                                                        from '@byteshift/injector';
import * as fs                                                          from 'fs';

@Service
export class TemplateRenderer implements RenderTemplateEventListener
{
    public priority: number = 1;

    public async callback(event: RenderTemplateEvent): Promise<void>
    {
        if (false === event.templateFile.endsWith('.html')) {
            return;
        }

        let src = fs.readFileSync(event.templateFile).toString();

        Object.keys((event.data || {})).forEach((key) => {
            const searchValue: string = `{{ ${key} }}`;

            while(src.indexOf(searchValue) !== -1) {
                src = src.replace(searchValue, event.data[key]);
            }
        });

        event.setResponse(new HtmlResponse(src, 200));
    }
}
