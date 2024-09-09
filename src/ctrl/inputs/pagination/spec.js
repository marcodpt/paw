import html from '../../../hyperscript/html.js'

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
            div({}, [
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
        datalist,
        option,
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
            div({}, [
              input({
                class: [
                  'validate',
                  'form-control',
                  'form-control-lg',
                  'is-valid'
                ],
                type: 'text',
                value: 'Page (1 / 1)',
                list: 'app_list_000001',
                disabled: ''
              }),
              datalist({
                id: 'app_list_000001'
              }, [
                option({}, [
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
        datalist,
        option,
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
            div({}, [
              input({
                class: [
                  'validate',
                  'form-control',
                  'form-control-sm'
                ],
                type: 'text',
                value: '(7 / 15)',
                list: 'app_list_000001'
              }),
              datalist({
                id: 'app_list_000001'
              }, [
                option({}, [
                  text('(-3 / 15)')
                ]),
                option({}, [
                  text('(-2 / 15)')
                ]),
                option({}, [
                  text('(-1 / 15)')
                ]),
                option({}, [
                  text('(0 / 15)')
                ]),
                option({}, [
                  text('(1 / 15)')
                ]),
                option({}, [
                  text('(2 / 15)')
                ]),
                option({}, [
                  text('(3 / 15)')
                ]),
                option({}, [
                  text('(4 / 15)')
                ]),
                option({}, [
                  text('(5 / 15)')
                ]),
                option({}, [
                  text('(6 / 15)')
                ]),
                option({}, [
                  text('(7 / 15)')
                ]),
                option({}, [
                  text('(8 / 15)')
                ]),
                option({}, [
                  text('(9 / 15)')
                ]),
                option({}, [
                  text('(10 / 15)')
                ]),
                option({}, [
                  text('(11 / 15)')
                ]),
                option({}, [
                  text('(12 / 15)')
                ]),
                option({}, [
                  text('(13 / 15)')
                ]),
                option({}, [
                  text('(14 / 15)')
                ]),
                option({}, [
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
