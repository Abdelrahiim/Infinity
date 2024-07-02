import {
  trigger,
  transition,
  style,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';
/**
 * Returns an animation trigger for opening and closing a dropdown menu.
 *
 * @return {AnimationTriggerMetadata} The animation trigger for opening and closing a dropdown menu.
 */
const dropDownAnimation = (): AnimationTriggerMetadata => {
  return trigger('DrowDownOpenClose', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-in-out', style({ opacity: 1 })),
    ]),
    transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0 }))]),
  ]);
};

export { dropDownAnimation };
