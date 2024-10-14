import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'radio',
  description: 'Radio controller',
  properties: {},
  examples: [
    {
      title: 'Wrong sm',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          description: 'Choose one option!',
          maximum: 2,
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          size: 'sm',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        label,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '2',
              id: 'app_radio_000004'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000004'
            }, [
              text('Cat')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '3',
              id: 'app_radio_000005'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000005'
            }, [
              text('Bird')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '4',
              id: 'app_radio_000006'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000006'
            }, [
              text('Horse')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-invalid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '0',
              id: 'app_radio_000002',
              checked: '',
              disabled: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000002'
            }, [
              text('Choose one option!')
            ]),
            div({
              class: 'invalid-feedback'
            }, [
              text('Must be one of the possible options.')
            ])
          ])
        ])
      )
    }, {
      title: 'Right without valid',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          default: 1,
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          update
        }
      ],
      html: html(({
        div,
        input,
        label,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '2',
              id: 'app_radio_000004'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000004'
            }, [
              text('Cat')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '3',
              id: 'app_radio_000005'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000005'
            }, [
              text('Bird')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '4',
              id: 'app_radio_000006'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000006'
            }, [
              text('Horse')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ])
        ])
      )
    }, {
      title: 'Right Lg',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          default: 2,
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          size: 'lg',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        label,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-valid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '2',
              id: 'app_radio_000004',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000004'
            }, [
              text('Cat')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '3',
              id: 'app_radio_000005'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000005'
            }, [
              text('Bird')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '4',
              id: 'app_radio_000006'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000006'
            }, [
              text('Horse')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ])
        ])
      )
    }, {
      title: 'Wrong single',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          options: [
            {
              value: 1,
              label: 'Dog'
            }
          ],
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        label,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-invalid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '0',
              id: 'app_radio_000002',
              checked: '',
              disabled: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000002'
            }, [
              text('0')
            ]),
            div({
              class: 'invalid-feedback'
            }, [
              text('Must be one of the possible options.')
            ])
          ])
        ])
      )
    }, {
      title: 'Wrong none',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          options: [],
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        label,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-invalid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '0',
              id: 'app_radio_000002',
              checked: '',
              disabled: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000002'
            }, [
              text('0')
            ]),
            div({
              class: 'invalid-feedback'
            }, [
              text('Must be one of the possible options.')
            ])
          ])
        ])
      )
    }, {
      title: 'right single',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          default: 1,
          options: [
            {
              value: 1,
              label: 'Dog'
            }
          ],
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        label,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-valid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ])
        ])
      )
    }, 
  ]
})
