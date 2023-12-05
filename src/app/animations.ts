import { animate, keyframes,group, state, style, transition, trigger } from '@angular/animations';

export const showStateTrigger = trigger('showState', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(400, style({
            opacity: 1
        }))
    ]),
    transition(':leave', [
        animate(300, style({
            opacity: 0
        }))
    ])
])

export const showContentTabs = trigger("showContentTap", [
    transition('default => activeted', [
        style({
            opacity: 0
        }),
        animate(300, style({
            opacity: 1
        }))
    ]),
    transition('activeted => default', [
        animate(300, style({
            opacity: 0
        }))
    ])
])

export const filterTrigger = trigger('filterAnimation', [
    transition(':enter', [
        style({
            opacity: 0, with: 0
        }),
        animate('400ms cubic-bezier(.17,.67,.83,.31)', keyframes([
            style({ opacity: 0, with: 0 }),
            // style({ opacity: 0.5, with: '*', backgroundColor:'#eee' }),
            style({ opacity: 1, with: '*' }),
        ])),
        transition(':leave', [
            animate('400ms ease-out', style({
                opacity: 0,
                width: 0
            }))
        ])
    ])
])

export const formButtonTrigger = trigger('formButton', [
    transition('invalid => valid', [
        group([
            animate(200, style({
                backgrondColor: '#eee'
            })),
            animate(100, style({
                transform: 'scale(1.2)'
            })),
        ]),
        animate(200, style({
            transform: 'scale(1)'
        }))
    ])
])


