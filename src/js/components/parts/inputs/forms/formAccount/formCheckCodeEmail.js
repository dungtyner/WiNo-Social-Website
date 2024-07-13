import React, { useState } from 'react'
import LogoWebsite from '../../../../logo/logoWebsite/LogoWebsite'
import FormAccount from '../formAccount/FormAccount.module.scss'
import { createRequest } from '../../../../../utilities/requests'
function CheckCodeEmail() {
  const [code, setCode] = useState('')
  const handleRestorePass = async function (e) {
    e.preventDefault()
    const res = await createRequest('POST', '/account/CheckCodeEmail', {
      body: { code },
    })

    if ('ok' === res.mess) {
      window.location.href = '/'
    }
  }
  return (
    <div className={FormAccount.wrapper}>
      {/* <img src="https://toptechmakers.com/wp-content/uploads/2022/04/social-media-marketing-services.png" alt=""></img> */}
      <section className={FormAccount.register__form}>
        <LogoWebsite />
        <h1>Hello, welcome back</h1>
        <form className="" onSubmit={handleRestorePass}>
          <div
            className={[FormAccount.field, FormAccount.input__text].join(' ')}
          >
            <input
              type="text"
              name="email"
              placeholder="Enter Code"
              onChange={(e) => {
                setCode(e.currentTarget.value)
              }}
            />
          </div>
          <div className={[FormAccount.field, FormAccount.button].join(' ')}>
            <input type="submit" name="submit" value="Send" />
          </div>
        </form>
      </section>
    </div>
  )
}

export default CheckCodeEmail
