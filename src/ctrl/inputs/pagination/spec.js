import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'pagination',
  description: 'Pagination controller',
  properties: {},
  examples: [
    {
      title: 'Pending',
      data: [
        {
          ui: 'pagination'
        }
      ],
      html: html(({
        div,
        button,
        i,
        input
      }) => 
        div({
          class: [
            'row',
            'gx-1',
            'justify-content-center'
          ]
        }, [
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'disabled'
              ],
              type: 'button'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-fast-backward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'disabled'
              ],
              type: 'button'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-step-backward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            div({
              class: 'position-relative'
            }, [
              input({
                class: [
                  'form-control',
                  'text-center'
                ],
                type: 'text',
                value: '⏳',
                disabled: ''
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'disabled'
              ],
              type: 'button'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-step-forward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'disabled'
              ],
              type: 'button'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-fast-forward'
                ]
              })
            ])
          ])
        ])
      )
    }, {
      title: 'Single page lg',
      data: [
        {
          ui: 'pagination',
          description: 'Page',
          context: 'secondary',
          default: 1,
          maximum: 1,
          size: 'lg',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        button,
        i,
        input,
        text
      }) => 
        div({
          class: [
            'row',
            'gx-1',
            'justify-content-center'
          ]
        }, [
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-secondary',
                'btn-lg'
              ],
              type: 'button',
              disabled: ''
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-fast-backward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-secondary',
                'btn-lg'
              ],
              type: 'button',
              disabled: ''
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-step-backward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            div({
              class: 'position-relative'
            }, [
              input({
                class: [
                  'validate',
                  'form-control',
                  'form-control-lg',
                  'is-valid'
                ],
                type: 'text',
                value: 'Page (1 / 1)',
                disabled: ''
              }),
              div({
                class: [
                  'list-group',
                  'd-none',
                  'w-100',
                  'position-absolute',
                  'z-3'
                ]
              }, [
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action',
                    'active'
                  ]
                }, [
                  text('Page (1 / 1)')
                ])
              ]),
              div({
                class: 'invalid-feedback'
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-secondary',
                'btn-lg'
              ],
              type: 'button',
              disabled: ''
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-step-forward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-secondary',
                'btn-lg'
              ],
              type: 'button',
              disabled: ''
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-fast-forward'
                ]
              })
            ])
          ])
        ])
      )
    }, {
      title: 'Multiple pages sm',
      data: [
        {
          ui: 'pagination',
          minimum: -3,
          maximum: 15,
          default: 7,
          size: 'sm',
          update
        }
      ],
      html: html(({
        div,
        button,
        i,
        input,
        text
      }) => 
        div({
          class: [
            'row',
            'gx-1',
            'justify-content-center'
          ]
        }, [
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'btn-sm'
              ],
              type: 'button'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-fast-backward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'btn-sm'
              ],
              type: 'button'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-step-backward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            div({
              class: 'position-relative'
            }, [
              input({
                class: [
                  'validate',
                  'form-control',
                  'form-control-sm'
                ],
                type: 'text',
                value: '(7 / 15)'
              }),
              div({
                class: [
                  'list-group',
                  'd-none',
                  'w-100',
                  'position-absolute',
                  'z-3'
                ]
              }, [
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(-3 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(-2 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(-1 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(0 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(1 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(2 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(3 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(4 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(5 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(6 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action',
                    'active'
                  ]
                }, [
                  text('(7 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(8 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(9 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(10 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(11 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(12 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(13 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(14 / 15)')
                ]),
                button({
                  class: [
                    'list-group-item',
                    'list-group-item-action'
                  ]
                }, [
                  text('(15 / 15)')
                ])
              ]),
              div({
                class: 'invalid-feedback'
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'btn-sm'
              ],
              type: 'button'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-step-forward'
                ]
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'btn-sm'
              ],
              type: 'button'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-fast-forward'
                ]
              })
            ])
          ])
        ])
      )
    }
  ]
})
