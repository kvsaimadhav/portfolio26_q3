import { 
  trigger, 
  transition, 
  style, 
  query, 
  animate, 
  stagger, 
  keyframes,
  group 
} from '@angular/animations';

// Page transition animation
export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0.95) translateY(20px)',
      }),
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease', 
        style({ 
          opacity: 1, 
          transform: 'scale(1) translateY(0)',
        })
      ),
    ], { optional: true })
  ]),
]);

// Fade in up animation for elements
export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'translateY(40px)' 
    }),
    animate('800ms ease-out', 
      style({ 
        opacity: 1, 
        transform: 'translateY(0)' 
      })
    )
  ])
]);

// Staggered list animation
export const listStagger = trigger('listStagger', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger('100ms', [
        animate('500ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

// Bounce in animation
export const bounceIn = trigger('bounceIn', [
  transition(':enter', [
    animate('0.8s ease-in', keyframes([
      style({ 
        opacity: 0, 
        transform: 'scale3d(0.3, 0.3, 0.3)', 
        offset: 0 
      }),
      style({ 
        transform: 'scale3d(1.1, 1.1, 1.1)', 
        offset: 0.2 
      }),
      style({ 
        transform: 'scale3d(0.9, 0.9, 0.9)', 
        offset: 0.4 
      }),
      style({ 
        opacity: 1, 
        transform: 'scale3d(1.03, 1.03, 1.03)', 
        offset: 0.6 
      }),
      style({ 
        transform: 'scale3d(0.97, 0.97, 0.97)', 
        offset: 0.8 
      }),
      style({ 
        opacity: 1, 
        transform: 'scale3d(1, 1, 1)', 
        offset: 1 
      })
    ]))
  ])
]);

// Slide in from right
export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'translateX(100px)' 
    }),
    animate('600ms ease-out', 
      style({ 
        opacity: 1, 
        transform: 'translateX(0)' 
      })
    )
  ])
]);

// Pulse animation
export const pulse = trigger('pulse', [
  transition(':enter', [
    style({ transform: 'scale(1)' }),
    animate('500ms ease-in-out', 
      keyframes([
        style({ transform: 'scale(1)', offset: 0 }),
        style({ transform: 'scale(1.05)', offset: 0.5 }),
        style({ transform: 'scale(1)', offset: 1 })
      ])
    )
  ])
]);