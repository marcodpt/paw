import html from '../../../hyperscript/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'items',
  description: 'Items controller',
  properties: {},
  examples: [
    {
      title: 'String Large',
      data: [
        {
          items: {
            type: 'string'
          },
          default: [
            'dog',
            'cat'
          ],
          size: 'lg',
          minItems: 1,
          maxItems: 5,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        button,
        i,
        input
      }) => 
        div({}, [
          div({
            class: [
              'row',
              'g-1',
              'align-items-center',
              'justify-content-start'
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
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-minus'
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
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-plus'
                  ]
                })
              ])
            ])
          ]),
          div({
            class: 'my-3'
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
                value: 'dog'
              }),
              div({
                class: 'invalid-feedback'
              })
            ])
          ]),
          div({
            class: 'my-3'
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
                value: 'cat'
              }),
              div({
                class: 'invalid-feedback'
              })
            ])
          ])
        ])
      )
    }, {
      title: 'Object Small',
      data: [
        {
          items: {
            title: 'Person',
            icon: 'user',
            properties: {
              name: {
                type: 'string',
                minLength: 1
              }, 
              age: {
                type: 'integer',
                default: 30
              }
            }
          },
          update,
          size: 'sm',
          default: [
            {
              name: 'john'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        i,
        fieldset,
        legend,
        span,
        text,
        hr,
        label,
        input
      }) => 
        div({}, [
          div({
            class: [
              'row',
              'g-1',
              'align-items-center',
              'justify-content-start'
            ]
          }, [
            div({
              class: 'col-auto'
            }, [
              button({
                class: [
                  'btn',
                  'btn-secondary',
                  'btn-sm'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-minus'
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
                  'btn-sm'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-plus'
                  ]
                })
              ])
            ])
          ]),
          div({
            class: 'my-1'
          }, [
            fieldset({}, [
              legend({
                class: [
                  'fw-bold',
                  'clearfix',
                  'fs-6'
                ]
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-user'
                    ]
                  }),
                  text(' Person')
                ])
              ]),
              hr({
                class: 'my-2'
              }),
              div({
                class: 'row'
              }, [
                div({
                  class: [
                    'col-12',
                    'my-1',
                    'row',
                    'small'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('name:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    input({
                      class: [
                        'validate',
                        'form-control',
                        'form-control-sm'
                      ],
                      type: 'text',
                      name: 'name',
                      value: 'john'
                    }),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ]),
                div({
                  class: [
                    'col-12',
                    'my-1',
                    'row',
                    'small'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('age:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    input({
                      class: [
                        'validate',
                        'form-control',
                        'form-control-sm'
                      ],
                      type: 'number',
                      name: 'age',
                      value: '30',
                      step: '1'
                    }),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Navbar Sample',
      data: [
        {
          items: {
            properties: {
              icon: {
                type: 'string',
                ui: 'icon'
              },
              title: {
                type: 'string'
              }, 
              href: {
                type: 'string'
              },
              children: {
                items: {
                  properties: {
                    icon: {
                      type: 'string',
                      ui: 'icon'
                    },
                    title: {
                      type: 'string'
                    }, 
                    href: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          default: [
            {
              title: 'Tools',
              icon: 'tools',
              children: [
                {
                  title: 'Users',
                  icon: 'user',
                  href: '#/users'
                }, {
                  title: 'Settings',
                  icon: 'cog',
                  href: '#/settings'
                }
              ]
            }, {
              title: 'Repository',
              icon: '@github',
              href: 'https://github.com/marcodpt/app'
            }
          ],
          update
        }
      ],
      html: html(({
        div,
        button,
        i,
        fieldset,
        label,
        text,
        span,
        input
      }) => 
        div({}, [
          div({
            class: [
              'row',
              'g-1',
              'align-items-center',
              'justify-content-start'
            ]
          }, [
            div({
              class: 'col-auto'
            }, [
              button({
                class: [
                  'btn',
                  'btn-secondary'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-minus'
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
                  'btn-secondary'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-plus'
                  ]
                })
              ])
            ])
          ]),
          div({
            class: 'my-2'
          }, [
            fieldset({}, [
              div({
                class: 'row'
              }, [
                div({
                  class: [
                    'col-12',
                    'my-2',
                    'row'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('icon:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    div({
                      class: 'input-group'
                    }, [
                      span({
                        class: 'input-group-text'
                      }, [
                        i({
                          class: [
                            'fa-solid',
                            'fa-tools'
                          ]
                        })
                      ]),
                      input({
                        class: [
                          'validate',
                          'form-control'
                        ],
                        type: 'text',
                        name: 'icon',
                        value: 'tools'
                      })
                    ]),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ]),
                div({
                  class: [
                    'col-12',
                    'my-2',
                    'row'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('title:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    input({
                      class: [
                        'validate',
                        'form-control'
                      ],
                      type: 'text',
                      name: 'title',
                      value: 'Tools'
                    }),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ]),
                div({
                  class: [
                    'col-12',
                    'my-2',
                    'row'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('href:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    input({
                      class: [
                        'validate',
                        'form-control'
                      ],
                      type: 'text',
                      name: 'href',
                      value: ''
                    }),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ]),
                div({
                  class: [
                    'col-12',
                    'my-2',
                    'row'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('children:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    div({
                      class: [
                        'row',
                        'g-1',
                        'align-items-center',
                        'justify-content-start'
                      ]
                    }, [
                      div({
                        class: 'col-auto'
                      }, [
                        button({
                          class: [
                            'btn',
                            'btn-secondary'
                          ],
                          type: 'button'
                        }, [
                          i({
                            class: [
                              'fa-solid',
                              'fa-minus'
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
                            'btn-secondary'
                          ],
                          type: 'button'
                        }, [
                          i({
                            class: [
                              'fa-solid',
                              'fa-plus'
                            ]
                          })
                        ])
                      ])
                    ]),
                    div({
                      class: 'my-2'
                    }, [
                      fieldset({}, [
                        div({
                          class: 'row'
                        }, [
                          div({
                            class: [
                              'col-12',
                              'my-2',
                              'row'
                            ]
                          }, [
                            div({
                              class: 'col-md-3'
                            }, [
                              label({
                                class: [
                                  'form-label',
                                  'fw-bold'
                                ]
                              }, [
                                text('icon:')
                              ])
                            ]),
                            div({
                              class: 'col-md-9'
                            }, [
                              div({
                                class: 'input-group'
                              }, [
                                span({
                                  class: 'input-group-text'
                                }, [
                                  i({
                                    class: [
                                      'fa-solid',
                                      'fa-user'
                                    ]
                                  })
                                ]),
                                input({
                                  class: [
                                    'validate',
                                    'form-control'
                                  ],
                                  type: 'text',
                                  name: 'icon',
                                  value: 'user'
                                })
                              ]),
                              div({
                                class: 'invalid-feedback'
                              })
                            ])
                          ]),
                          div({
                            class: [
                              'col-12',
                              'my-2',
                              'row'
                            ]
                          }, [
                            div({
                              class: 'col-md-3'
                            }, [
                              label({
                                class: [
                                  'form-label',
                                  'fw-bold'
                                ]
                              }, [
                                text('title:')
                              ])
                            ]),
                            div({
                              class: 'col-md-9'
                            }, [
                              input({
                                class: [
                                  'validate',
                                  'form-control'
                                ],
                                type: 'text',
                                name: 'title',
                                value: 'Users'
                              }),
                              div({
                                class: 'invalid-feedback'
                              })
                            ])
                          ]),
                          div({
                            class: [
                              'col-12',
                              'my-2',
                              'row'
                            ]
                          }, [
                            div({
                              class: 'col-md-3'
                            }, [
                              label({
                                class: [
                                  'form-label',
                                  'fw-bold'
                                ]
                              }, [
                                text('href:')
                              ])
                            ]),
                            div({
                              class: 'col-md-9'
                            }, [
                              input({
                                class: [
                                  'validate',
                                  'form-control'
                                ],
                                type: 'text',
                                name: 'href',
                                value: '#/users'
                              }),
                              div({
                                class: 'invalid-feedback'
                              })
                            ])
                          ])
                        ])
                      ])
                    ]),
                    div({
                      class: 'my-2'
                    }, [
                      fieldset({}, [
                        div({
                          class: 'row'
                        }, [
                          div({
                            class: [
                              'col-12',
                              'my-2',
                              'row'
                            ]
                          }, [
                            div({
                              class: 'col-md-3'
                            }, [
                              label({
                                class: [
                                  'form-label',
                                  'fw-bold'
                                ]
                              }, [
                                text('icon:')
                              ])
                            ]),
                            div({
                              class: 'col-md-9'
                            }, [
                              div({
                                class: 'input-group'
                              }, [
                                span({
                                  class: 'input-group-text'
                                }, [
                                  i({
                                    class: [
                                      'fa-solid',
                                      'fa-cog'
                                    ]
                                  })
                                ]),
                                input({
                                  class: [
                                    'validate',
                                    'form-control'
                                  ],
                                  type: 'text',
                                  name: 'icon',
                                  value: 'cog'
                                })
                              ]),
                              div({
                                class: 'invalid-feedback'
                              })
                            ])
                          ]),
                          div({
                            class: [
                              'col-12',
                              'my-2',
                              'row'
                            ]
                          }, [
                            div({
                              class: 'col-md-3'
                            }, [
                              label({
                                class: [
                                  'form-label',
                                  'fw-bold'
                                ]
                              }, [
                                text('title:')
                              ])
                            ]),
                            div({
                              class: 'col-md-9'
                            }, [
                              input({
                                class: [
                                  'validate',
                                  'form-control'
                                ],
                                type: 'text',
                                name: 'title',
                                value: 'Settings'
                              }),
                              div({
                                class: 'invalid-feedback'
                              })
                            ])
                          ]),
                          div({
                            class: [
                              'col-12',
                              'my-2',
                              'row'
                            ]
                          }, [
                            div({
                              class: 'col-md-3'
                            }, [
                              label({
                                class: [
                                  'form-label',
                                  'fw-bold'
                                ]
                              }, [
                                text('href:')
                              ])
                            ]),
                            div({
                              class: 'col-md-9'
                            }, [
                              input({
                                class: [
                                  'validate',
                                  'form-control'
                                ],
                                type: 'text',
                                name: 'href',
                                value: '#/settings'
                              }),
                              div({
                                class: 'invalid-feedback'
                              })
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ]),
          div({
            class: 'my-2'
          }, [
            fieldset({}, [
              div({
                class: 'row'
              }, [
                div({
                  class: [
                    'col-12',
                    'my-2',
                    'row'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('icon:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    div({
                      class: 'input-group'
                    }, [
                      span({
                        class: 'input-group-text'
                      }, [
                        i({
                          class: [
                            'fa-brands',
                            'fa-github'
                          ]
                        })
                      ]),
                      input({
                        class: [
                          'validate',
                          'form-control'
                        ],
                        type: 'text',
                        name: 'icon',
                        value: '@github'
                      })
                    ]),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ]),
                div({
                  class: [
                    'col-12',
                    'my-2',
                    'row'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('title:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    input({
                      class: [
                        'validate',
                        'form-control'
                      ],
                      type: 'text',
                      name: 'title',
                      value: 'Repository'
                    }),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ]),
                div({
                  class: [
                    'col-12',
                    'my-2',
                    'row'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('href:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    input({
                      class: [
                        'validate',
                        'form-control'
                      ],
                      type: 'text',
                      name: 'href',
                      value: 'https://github.com/marcodpt/app'
                    }),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ]),
                div({
                  class: [
                    'col-12',
                    'my-2',
                    'row'
                  ]
                }, [
                  div({
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('children:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    div({
                      class: [
                        'row',
                        'g-1',
                        'align-items-center',
                        'justify-content-start'
                      ]
                    }, [
                      div({
                        class: 'col-auto'
                      }, [
                        button({
                          class: [
                            'btn',
                            'btn-secondary'
                          ],
                          type: 'button',
                          disabled: ''
                        }, [
                          i({
                            class: [
                              'fa-solid',
                              'fa-minus'
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
                            'btn-secondary'
                          ],
                          type: 'button'
                        }, [
                          i({
                            class: [
                              'fa-solid',
                              'fa-plus'
                            ]
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    }
  ]
})
