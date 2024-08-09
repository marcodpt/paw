import {html, carousel} from '../components.js'

export default ({
  icon: 'images',
  title: 'carousel',
  description: 'Carousel component with several usage options.',
  component: carousel,
  properties: {
    images: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          src: {
            type: 'string',
            description: 'URL of the image associated with the slide.',
          },
          title: {
            type: 'string',
            description: `
              Caption title when present.
              Also alt attribute of the image.
            `
          },
          description: {
            type: 'string',
            description: `
              Caption description when present.
              Otherwise title attribute of the image.
            `
          },
          interval: {
            type: 'integer',
            description: `
              The time in milliseconds between the automatic transition of images.
              This is specific to this image.
              The global interval must be specified to run autoplay.
              And it will be the default value for all images.
            `,
            minimum: 0,
            default: 0
          }
        }
      }
    },
    index: {
      type: 'integer',
      description: 'The index of the initial image.',
      default: 0,
      minimum: 0
    },
    interval: {
      type: 'integer',
      description: `
        The time in milliseconds between the automatic transition of images.
        Use zero to not autoplay.
      `,
      minimum: 0,
      default: 0
    },
    inverted: {
      type: 'boolean',
      description: `
        Invert the colors of indicators, controls and caption.
        Used for light images.
      `,
      default: false
    },
    noIndicators: {
      type: 'boolean',
      description: 'Do not display indicators.',
      default: false
    },
    noControls: {
      type: 'boolean',
      description: 'Do not display controls.',
      default: false
    },
    noCaption: {
      type: 'boolean',
      description: 'Do not display the caption.',
      default: false
    },
    noTouch: {
      type: 'boolean',
      description: 'Disable swiping on touch devices.',
      default: false
    },
    fade: {
      type: 'boolean',
      description: 'Whether to use the fade transition between slides.',
      default: false
    }
  },
  examples: [
    {
      title: 'Default',
      data: [
        {
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.'
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        img,
        h5,
        text,
        p,
        span
      }) => 
        div({
          id: 'app_carousel_000002',
          class: [
            'carousel',
            'slide'
          ]
        }, [
          div({
            class: 'carousel-indicators'
          }, [
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000002',
              dataBsSlideTo: '0',
              class: 'active',
              ariaCurrent: 'true',
              ariaLabel: 'First'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000002',
              dataBsSlideTo: '1',
              ariaLabel: 'Second'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000002',
              dataBsSlideTo: '2',
              ariaLabel: 'Third'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000002',
              dataBsSlideTo: '3',
              ariaLabel: 'Fourth'
            })
          ]),
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: [
                'carousel-item',
                'active'
              ]
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('First')
                ]),
                p({}, [
                  text('Endless staircases.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Second')
                ]),
                p({}, [
                  text('Pine cone on the trunk.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Third')
                ]),
                p({}, [
                  text('Walk on ice.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Fourth')
                ]),
                p({}, [
                  text('An unusual chess game.')
                ])
              ])
            ])
          ]),
          button({
            class: 'carousel-control-prev',
            type: 'button',
            dataBsTarget: '#app_carousel_000002',
            dataBsSlide: 'prev'
          }, [
            span({
              class: 'carousel-control-prev-icon',
              ariaHidden: 'true'
            })
          ]),
          button({
            class: 'carousel-control-next',
            type: 'button',
            dataBsTarget: '#app_carousel_000002',
            dataBsSlide: 'next'
          }, [
            span({
              class: 'carousel-control-next-icon',
              ariaHidden: 'true'
            })
          ])
        ])
      )
    }, {
      title: 'Starting on the third slide',
      data: [
        {
          index: 2,
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.'
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        img,
        h5,
        text,
        p,
        span
      }) => 
        div({
          id: 'app_carousel_000001',
          class: [
            'carousel',
            'slide'
          ]
        }, [
          div({
            class: 'carousel-indicators'
          }, [
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000001',
              dataBsSlideTo: '0',
              ariaLabel: 'First'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000001',
              dataBsSlideTo: '1',
              ariaLabel: 'Second'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000001',
              dataBsSlideTo: '2',
              class: 'active',
              ariaCurrent: 'true',
              ariaLabel: 'Third'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000001',
              dataBsSlideTo: '3',
              ariaLabel: 'Fourth'
            })
          ]),
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('First')
                ]),
                p({}, [
                  text('Endless staircases.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Second')
                ]),
                p({}, [
                  text('Pine cone on the trunk.')
                ])
              ])
            ]),
            div({
              class: [
                'carousel-item',
                'active'
              ]
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Third')
                ]),
                p({}, [
                  text('Walk on ice.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Fourth')
                ]),
                p({}, [
                  text('An unusual chess game.')
                ])
              ])
            ])
          ]),
          button({
            class: 'carousel-control-prev',
            type: 'button',
            dataBsTarget: '#app_carousel_000001',
            dataBsSlide: 'prev'
          }, [
            span({
              class: 'carousel-control-prev-icon',
              ariaHidden: 'true'
            })
          ]),
          button({
            class: 'carousel-control-next',
            type: 'button',
            dataBsTarget: '#app_carousel_000001',
            dataBsSlide: 'next'
          }, [
            span({
              class: 'carousel-control-next-icon',
              ariaHidden: 'true'
            })
          ])
        ])
      )
    }, {
      title: 'Inverted',
      data: [
        {
          inverted: true,
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.'
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        img,
        h5,
        text,
        p,
        span
      }) => 
        div({
          id: 'app_carousel_000003',
          class: [
            'carousel',
            'slide'
          ],
          dataBsTheme: 'dark'
        }, [
          div({
            class: 'carousel-indicators'
          }, [
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000003',
              dataBsSlideTo: '0',
              class: 'active',
              ariaCurrent: 'true',
              ariaLabel: 'First'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000003',
              dataBsSlideTo: '1',
              ariaLabel: 'Second'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000003',
              dataBsSlideTo: '2',
              ariaLabel: 'Third'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000003',
              dataBsSlideTo: '3',
              ariaLabel: 'Fourth'
            })
          ]),
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: [
                'carousel-item',
                'active'
              ]
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('First')
                ]),
                p({}, [
                  text('Endless staircases.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Second')
                ]),
                p({}, [
                  text('Pine cone on the trunk.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Third')
                ]),
                p({}, [
                  text('Walk on ice.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Fourth')
                ]),
                p({}, [
                  text('An unusual chess game.')
                ])
              ])
            ])
          ]),
          button({
            class: 'carousel-control-prev',
            type: 'button',
            dataBsTarget: '#app_carousel_000003',
            dataBsSlide: 'prev'
          }, [
            span({
              class: 'carousel-control-prev-icon',
              ariaHidden: 'true'
            })
          ]),
          button({
            class: 'carousel-control-next',
            type: 'button',
            dataBsTarget: '#app_carousel_000003',
            dataBsSlide: 'next'
          }, [
            span({
              class: 'carousel-control-next-icon',
              ariaHidden: 'true'
            })
          ])
        ])
      )
    }, {
      title: 'No Indicators',
      data: [
        {
          noIndicators: true,
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.'
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        img,
        h5,
        text,
        p,
        button,
        span
      }) => 
        div({
          id: 'app_carousel_000004',
          class: [
            'carousel',
            'slide'
          ]
        }, [
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: [
                'carousel-item',
                'active'
              ]
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('First')
                ]),
                p({}, [
                  text('Endless staircases.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Second')
                ]),
                p({}, [
                  text('Pine cone on the trunk.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Third')
                ]),
                p({}, [
                  text('Walk on ice.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Fourth')
                ]),
                p({}, [
                  text('An unusual chess game.')
                ])
              ])
            ])
          ]),
          button({
            class: 'carousel-control-prev',
            type: 'button',
            dataBsTarget: '#app_carousel_000004',
            dataBsSlide: 'prev'
          }, [
            span({
              class: 'carousel-control-prev-icon',
              ariaHidden: 'true'
            })
          ]),
          button({
            class: 'carousel-control-next',
            type: 'button',
            dataBsTarget: '#app_carousel_000004',
            dataBsSlide: 'next'
          }, [
            span({
              class: 'carousel-control-next-icon',
              ariaHidden: 'true'
            })
          ])
        ])
      )
    }, {
      title: 'No Controls',
      data: [
        {
          noControls: true,
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.'
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        img,
        h5,
        text,
        p
      }) => 
        div({
          id: 'app_carousel_000005',
          class: [
            'carousel',
            'slide'
          ]
        }, [
          div({
            class: 'carousel-indicators'
          }, [
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000005',
              dataBsSlideTo: '0',
              class: 'active',
              ariaCurrent: 'true',
              ariaLabel: 'First'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000005',
              dataBsSlideTo: '1',
              ariaLabel: 'Second'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000005',
              dataBsSlideTo: '2',
              ariaLabel: 'Third'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000005',
              dataBsSlideTo: '3',
              ariaLabel: 'Fourth'
            })
          ]),
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: [
                'carousel-item',
                'active'
              ]
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('First')
                ]),
                p({}, [
                  text('Endless staircases.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Second')
                ]),
                p({}, [
                  text('Pine cone on the trunk.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Third')
                ]),
                p({}, [
                  text('Walk on ice.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Fourth')
                ]),
                p({}, [
                  text('An unusual chess game.')
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'No Caption',
      data: [
        {
          noCaption: true,
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.'
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        img,
        span
      }) => 
        div({
          id: 'app_carousel_000006',
          class: [
            'carousel',
            'slide'
          ]
        }, [
          div({
            class: 'carousel-indicators'
          }, [
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000006',
              dataBsSlideTo: '0',
              class: 'active',
              ariaCurrent: 'true',
              ariaLabel: 'First'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000006',
              dataBsSlideTo: '1',
              ariaLabel: 'Second'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000006',
              dataBsSlideTo: '2',
              ariaLabel: 'Third'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000006',
              dataBsSlideTo: '3',
              ariaLabel: 'Fourth'
            })
          ]),
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: [
                'carousel-item',
                'active'
              ]
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First',
                title: 'Endless staircases.'
              })
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second',
                title: 'Pine cone on the trunk.'
              })
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third',
                title: 'Walk on ice.'
              })
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth',
                title: 'An unusual chess game.'
              })
            ])
          ]),
          button({
            class: 'carousel-control-prev',
            type: 'button',
            dataBsTarget: '#app_carousel_000006',
            dataBsSlide: 'prev'
          }, [
            span({
              class: 'carousel-control-prev-icon',
              ariaHidden: 'true'
            })
          ]),
          button({
            class: 'carousel-control-next',
            type: 'button',
            dataBsTarget: '#app_carousel_000006',
            dataBsSlide: 'next'
          }, [
            span({
              class: 'carousel-control-next-icon',
              ariaHidden: 'true'
            })
          ])
        ])
      )
    }, {
      title: 'No Touch',
      data: [
        {
          noTouch: true,
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.'
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        img,
        h5,
        text,
        p,
        span
      }) => 
        div({
          id: 'app_carousel_000007',
          class: [
            'carousel',
            'slide'
          ],
          dataBsTouch: 'false'
        }, [
          div({
            class: 'carousel-indicators'
          }, [
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000007',
              dataBsSlideTo: '0',
              class: 'active',
              ariaCurrent: 'true',
              ariaLabel: 'First'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000007',
              dataBsSlideTo: '1',
              ariaLabel: 'Second'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000007',
              dataBsSlideTo: '2',
              ariaLabel: 'Third'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000007',
              dataBsSlideTo: '3',
              ariaLabel: 'Fourth'
            })
          ]),
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: [
                'carousel-item',
                'active'
              ]
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('First')
                ]),
                p({}, [
                  text('Endless staircases.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Second')
                ]),
                p({}, [
                  text('Pine cone on the trunk.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Third')
                ]),
                p({}, [
                  text('Walk on ice.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Fourth')
                ]),
                p({}, [
                  text('An unusual chess game.')
                ])
              ])
            ])
          ]),
          button({
            class: 'carousel-control-prev',
            type: 'button',
            dataBsTarget: '#app_carousel_000007',
            dataBsSlide: 'prev'
          }, [
            span({
              class: 'carousel-control-prev-icon',
              ariaHidden: 'true'
            })
          ]),
          button({
            class: 'carousel-control-next',
            type: 'button',
            dataBsTarget: '#app_carousel_000007',
            dataBsSlide: 'next'
          }, [
            span({
              class: 'carousel-control-next-icon',
              ariaHidden: 'true'
            })
          ])
        ])
      )
    }, {
      title: 'Fade',
      data: [
        {
          fade: true,
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.'
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        img,
        h5,
        text,
        p,
        span
      }) => 
        div({
          id: 'app_carousel_000008',
          class: [
            'carousel',
            'slide',
            'carousel-fade'
          ]
        }, [
          div({
            class: 'carousel-indicators'
          }, [
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000008',
              dataBsSlideTo: '0',
              class: 'active',
              ariaCurrent: 'true',
              ariaLabel: 'First'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000008',
              dataBsSlideTo: '1',
              ariaLabel: 'Second'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000008',
              dataBsSlideTo: '2',
              ariaLabel: 'Third'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000008',
              dataBsSlideTo: '3',
              ariaLabel: 'Fourth'
            })
          ]),
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: [
                'carousel-item',
                'active'
              ]
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('First')
                ]),
                p({}, [
                  text('Endless staircases.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Second')
                ]),
                p({}, [
                  text('Pine cone on the trunk.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Third')
                ]),
                p({}, [
                  text('Walk on ice.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Fourth')
                ]),
                p({}, [
                  text('An unusual chess game.')
                ])
              ])
            ])
          ]),
          button({
            class: 'carousel-control-prev',
            type: 'button',
            dataBsTarget: '#app_carousel_000008',
            dataBsSlide: 'prev'
          }, [
            span({
              class: 'carousel-control-prev-icon',
              ariaHidden: 'true'
            })
          ]),
          button({
            class: 'carousel-control-next',
            type: 'button',
            dataBsTarget: '#app_carousel_000008',
            dataBsSlide: 'next'
          }, [
            span({
              class: 'carousel-control-next-icon',
              ariaHidden: 'true'
            })
          ])
        ])
      )
    }, {
      title: '1 second interval with the third slide at 2 seconds',
      data: [
        {
          interval: 1000,
          images: [
            {
              src: 'src/carousel/first.jpg',
              title: 'First',
              description: 'Endless staircases.'
            }, {
              src: 'src/carousel/second.jpg',
              title: 'Second',
              description: 'Pine cone on the trunk.'
            }, {
              src: 'src/carousel/third.jpg',
              title: 'Third',
              description: 'Walk on ice.',
              interval: 2000
            }, {
              src: 'src/carousel/fourth.jpg',
              title: 'Fourth',
              description: 'An unusual chess game.'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        img,
        h5,
        text,
        p,
        span
      }) => 
        div({
          id: 'app_carousel_000009',
          class: [
            'carousel',
            'slide'
          ],
          dataBsRide: 'carousel',
          dataBsPause: 'false'
        }, [
          div({
            class: 'carousel-indicators'
          }, [
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000009',
              dataBsSlideTo: '0',
              class: 'active',
              ariaCurrent: 'true',
              ariaLabel: 'First'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000009',
              dataBsSlideTo: '1',
              ariaLabel: 'Second'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000009',
              dataBsSlideTo: '2',
              ariaLabel: 'Third'
            }),
            button({
              type: 'button',
              dataBsTarget: '#app_carousel_000009',
              dataBsSlideTo: '3',
              ariaLabel: 'Fourth'
            })
          ]),
          div({
            class: 'carousel-inner'
          }, [
            div({
              class: [
                'carousel-item',
                'active'
              ],
              dataBsInterval: '1000'
            }, [
              img({
                src: 'src/carousel/first.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'First'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('First')
                ]),
                p({}, [
                  text('Endless staircases.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item',
              dataBsInterval: '1000'
            }, [
              img({
                src: 'src/carousel/second.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Second'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Second')
                ]),
                p({}, [
                  text('Pine cone on the trunk.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item',
              dataBsInterval: '2000'
            }, [
              img({
                src: 'src/carousel/third.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Third'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Third')
                ]),
                p({}, [
                  text('Walk on ice.')
                ])
              ])
            ]),
            div({
              class: 'carousel-item',
              dataBsInterval: '1000'
            }, [
              img({
                src: 'src/carousel/fourth.jpg',
                class: [
                  'd-block',
                  'w-100'
                ],
                alt: 'Fourth'
              }),
              div({
                class: [
                  'carousel-caption',
                  'd-none',
                  'd-md-block'
                ]
              }, [
                h5({}, [
                  text('Fourth')
                ]),
                p({}, [
                  text('An unusual chess game.')
                ])
              ])
            ])
          ]),
          button({
            class: 'carousel-control-prev',
            type: 'button',
            dataBsTarget: '#app_carousel_000009',
            dataBsSlide: 'prev'
          }, [
            span({
              class: 'carousel-control-prev-icon',
              ariaHidden: 'true'
            })
          ]),
          button({
            class: 'carousel-control-next',
            type: 'button',
            dataBsTarget: '#app_carousel_000009',
            dataBsSlide: 'next'
          }, [
            span({
              class: 'carousel-control-next-icon',
              ariaHidden: 'true'
            })
          ])
        ])
      )
    }
  ]
})
