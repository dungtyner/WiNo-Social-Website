import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import queryString from 'query-string'
import FormSearch from '../../parts/inputs/forms/formSearch/FormSearch.js'
import PopupAccountHeader from '../popups/popupHeader/popupAccountHeader/PopupAccountHeader'
import LabelCircle from '../../parts/labels/labelCircle/LabelCircle.js'
import '../header/Header.css'
import LogoWebsite from '../../logo/logoWebsite/LogoWebsite.js'
import { useStore } from '../../../store'
import { actions } from '../../../store'
import AccountAPI from '../../../API/AccountAPI'
import { Icon_Mess } from '../../parts/icons/fontAwesome/FontAwesome'
import PopupMessageHeader from '../popups/popupHeader/popupMessageHeader/PopupMessageHeader'
import PopupNotificationHeader from '../popups/popupHeader/popupNotificationHeader/PopupNotificationHeader'
import { set_url } from '../../../store/actions.js'
import PopUp_ from '../popups/popup.js'
import PropTypes from 'prop-types'
import { createRequest } from '../../../utilities/requests.js'

/* eslint-disable no-unused-vars */
function Header({ avatar_account, slug_personal, account }) {
  const [state, dispatch] = useStore()
  const [stateCountMess, set_stateCountMess] = useState(
    account.count_notification_chat,
  )
  const [stateCountNotification, set_stateCountNotification] = useState(
    account.count_notification,
  )
  const [keyword, set_keyword] = useState('')
  const [show_search, set_show_search] = useState(false)
  const [list_search, set_list_search] = useState([])
  useEffect(() => {
    state.socketChat.on(`PEOPLE_SENDING`, ({ id_Chat, slug_sender }) => {
      var tmpState = stateCountMess
      // console.log(slug_sender,state);
      if (slug_sender && id_Chat && slug_personal) {
        if (slug_sender != slug_personal) {
          if (tmpState.indexOf(id_Chat) < 0) {
            set_stateCountMess((stateCountMess) => {
              return tmpState.concat([id_Chat])
            })
          }
        }
      }
    })
  }, [stateCountMess])
  useEffect(() => {
    state.socket.on(
      `${slug_personal}_UPDATE_COUNT_NOTIFICATION`,
      (data_account) => {
        console.log(`${slug_personal}_UPDATE_COUNT_NOTIFICATION`, data_account)
        set_stateCountNotification(data_account.count_notification)
        state.socket.off(`${slug_personal}_UPDATE_COUNT_NOTIFICATION`)
      },
    )
  }, [stateCountNotification])
  const handle_renderPopHeader = (
    event,
    isActive,
    setActive,
    component_PopUp,
    Tmp_add_popup_content,
  ) => {
    if (!document.querySelector('.container-popupAccountHeader')) {
      // document.querySelector('.LogoWebsite_body-logo_website__ZeBTa').addEventListener('click',Tmp_add_popup_content(<div>OhAlo</div>))
      dispatch(actions.add_popup_content(component_PopUp))
    }
  }
  const handler_Search = (value) => {
    show_menu_search(value)
    set_keyword(value)
  }

  function show_menu_search(value) {
    if (value !== '') {
      set_show_search(true)
    } else {
      set_show_search(false)
    }
  }
  // Hàm này dùng để hiện menu search

  // Hàm này dễ gọi lại API phụ thuộc vào State keyword
  useEffect(() => {
    if (show_search) {
      const fetchData = async () => {
        const params = {
          keyword: keyword,
        }
        const query = '?' + queryString.stringify(params)
        const response = await AccountAPI.searchAccounts(query)
        set_list_search(response)
      }
      fetchData()
    }
  }, [keyword])
  return (
    <header>
      <div className="section-left_header">
        <div className="part-logo_socialWeb__header">
          <LogoWebsite />
        </div>
      </div>
      <div className="section-center_header">
        <div className="part-search__header">
          <FormSearch
            placeholder_text={'Search...'}
            handler_Search={handler_Search}
          />
          {show_search && (
            <PopUp_
              work_case_unmount={() => {
                set_show_search(false)
              }}
            >
              <div className="drop_menu_search">
                {list_search.length > 0 &&
                  list_search.map((value, idx) => (
                    <span
                      key={idx}
                      className="result-SearchHeader"
                      onClick={(event) => {
                        set_show_search(false)
                        dispatch(set_url(`/account/${value.slug_personal}`))
                      }}
                    >
                      <Link
                        to={`/account/personal/${value.slug_personal}`}
                        className="link_search"
                        key={idx}
                      >
                        <Avatar
                          src={value.avatar_account}
                          alt=""
                          className="image_drop_avatar"
                        />
                        <div className="text_search_account">
                          <span
                            style={{
                              fontWeight: '600',
                              fontSize: '20px',
                              color: 'rgb(38, 157, 54)',
                            }}
                          >{`${value.user_fname} ${value.user_lname}`}</span>
                        </div>
                      </Link>
                    </span>
                  ))}
              </div>
            </PopUp_>
          )}
        </div>
      </div>
      <div className="section-right_header">
        <div className="part-list_optUser__header">
          <div className="list-optUser__header">
            <LabelCircle
              key={0}
              el_Icon={<Icon_Mess />}
              numCount={stateCountMess.length}
              handleClick={async (
                event,
                isChecked,
                setChecked,
                Tmp_add_popup_content,
              ) => {
                if (stateCountMess.length > 0) {
                  const query = {
                    listNotification: stateCountMess,
                  }

                  await createRequest('GET', '/chat/clearNotificationChat', {
                    query,
                  })
                }

                const data = await createRequest('GET', '/chat/getListBoxChat')
                handle_renderPopHeader(
                  event,
                  isChecked,
                  setChecked,
                  <>
                    <PopupMessageHeader listChat={data} />
                  </>,
                  Tmp_add_popup_content,
                )
                set_stateCountMess([])
              }}
            />
            <LabelCircle
              key={1}
              el_Icon={<i className="fa-regular fa-bell"></i>}
              numCount={stateCountNotification}
              handleClick={async (
                event,
                isChecked,
                setChecked,
                Tmp_add_popup_content,
              ) => {
                if (stateCountNotification > 0) {
                  await createRequest(
                    'GET',
                    '/notification/clearCountNotification',
                  )
                  set_stateCountNotification(0)
                }

                var data = await createRequest(
                  'GET',
                  '/notification/request_getNotification',
                )
                handle_renderPopHeader(
                  event,
                  isChecked,
                  setChecked,
                  <>
                    <PopupNotificationHeader dataNotification={data} />
                  </>,
                  Tmp_add_popup_content,
                )
              }}
            />
            <LabelCircle
              key={3}
              handleClick={(
                event,
                isChecked,
                setChecked,
                Tmp_add_popup_content,
              ) => {
                handle_renderPopHeader(
                  event,
                  isChecked,
                  setChecked,
                  <>
                    <PopupAccountHeader />
                  </>,
                  Tmp_add_popup_content,
                )
              }}
              urlImg={avatar_account}
              objDetail={{}}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  avatar_account: PropTypes.string.isRequired,
  slug_personal: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Header
/* eslint-disable no-unused-vars */
