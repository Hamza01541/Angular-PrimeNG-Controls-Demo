export const builtInButtons = {
  cancel: {
    classes: 'cancel-button',
    secondary: true,
    text: 'Exit',
    type: 'cancel'
  },
  next: {
    classes: 'next-button',
    text: 'Next',
    type: 'next'
  },
  back: {
    classes: 'back-button',
    secondary: true,
    text: 'Back',
    type: 'back'
  }
};

export const defaultStepOptions = {
  classes: 'shepherd-theme-arrows custom-default-class',
  scrollTo: true,
  cancelIcon: {
    enabled: true
  }
};

export const steps = [
  {
    attachTo: {
      element: '#headers',
      on: 'bottom'
    },
    buttons: [
      builtInButtons.cancel,
      builtInButtons.next
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    id: 'intro',
    title: 'Total remaining credtis Intro!',
    text: `Yours total remainging credits. You can check your subscription detail by clicking on this.`
  },

  {
    attachTo: {
      element: '#loginId',
      on: 'bottom'
    },
    buttons: [
      builtInButtons.back,
      builtInButtons.cancel,
      // builtInButtons.next
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    id: 'login',
    title: 'Profile settings',
    text: `Click on this icon to manage your settings.`
  },
];
