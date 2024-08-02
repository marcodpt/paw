import node from '../hyperscript/node.js'
import spinner from '../spinner/index.js'
import {uid} from '../lib.js'

export default ({
  images,
  index,
  interval,
  inverted,
  noIndicators,
  noControls,
  noCaption,
  noTouch,
  fade
}) => {
  images = (images || []).map(image => ({
    interval,
    ...image
  }))
  index = images[index] == null ? 0 : index
  const id = uid('carousel')

  return node(({
    div,
    button,
    img,
    h5,
    text,
    p,
    span
  }) => 
    div({
      id,
      class: [
        'carousel',
        'slide',
        fade ? 'carousel-fade' : ''
      ],
      dataBsRide: interval ? 'carousel' : null,
      dataBsPause: interval ? 'false' : null,
      dataBsTouch: noTouch ? 'false' : null,
      dataBsTheme: inverted ? 'dark' : null
    }, [
      noIndicators ? null : div({
        class: 'carousel-indicators'
      }, images.map(({title}, i) => 
        button({
          type: 'button',
          dataBsTarget: '#'+id,
          dataBsSlideTo: i,
          class: i == index ? 'active' : null,
          ariaCurrent: i == index ? 'true' : null,
          ariaLabel: title
        }),
      )),
      div({
        class: 'carousel-inner'
      }, images.map(({src, title, description, interval}, i) => 
        div({
          class: [
            'carousel-item',
            i == index ? 'active' : ''
          ],
          dataBsInterval: interval
        }, [
          img({
            src,
            class: [
              'd-block',
              'w-100'
            ],
            alt: title,
            title: noCaption ? description : null
          }),
          noCaption || (!title && !description) ? null : div({
            class: [
              'carousel-caption',
              'd-none',
              'd-md-block'
            ]
          }, [
            !title ? null : h5({}, [
              text(title)
            ]),
            !description ? null : p({}, [
              text(description)
            ])
          ])
        ])
      )),
      noControls ? null : button({
        class: 'carousel-control-prev',
        type: 'button',
        dataBsTarget: '#'+id,
        dataBsSlide: 'prev'
      }, [
        span({
          class: 'carousel-control-prev-icon',
          ariaHidden: 'true'
        })
      ]),
      noControls ? null : button({
        class: 'carousel-control-next',
        type: 'button',
        dataBsTarget: '#'+id,
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
