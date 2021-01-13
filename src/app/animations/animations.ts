import { animation, trigger, animateChild, group, transition, animate, style, query, state } from '@angular/animations';



/* ROUTER ANIMATIONS */
export const componentAnimate = [
  trigger('routerAnimations', [
    transition('* => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        })
      ], { optional: true }
      ),
      query(':enter', [
        style({ opacity: 0 })
      ],
        { optional: true }
      ),
      query(':leave', [animateChild()], { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms 300ms ease-out', style({ opacity: 1 }))
        ], { optional: true })
      ]),
      query(':enter', [animateChild()], { optional: true }),
    ]),

  ]
  )];

/* ngIf Animations */
export const ngIfAnimate = [
  trigger(
    'inAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('150ms  ease-out',
        style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('150ms ease-in', style({ opacity: 0 }))
    ]),

  ]
  )
];

export const navbarAnimation = [
  trigger('navBarAnimate', [
    transition(':enter', [
      style({ top: '-100vh' }),
      animate('200ms ease-out',
        style({ top: '0' }))
    ]),
    transition(':leave', [
      style({ top: 0 }),
      animate('200ms ease-in',
        style({ top: '-100vh' }))
    ])
  ])
]

export const fade = [
  trigger('fade', [
    state('in', style({ 'opacity': '1' })),
    state('out', style({ 'opacity': '0' })),
    transition('* <=> *', [
      animate(300)
    ])
  ])
];
