import { createStorage, type SimpleStorage } from './storage'
class Auth {
  private storage: SimpleStorage
  readonly apiUrl: string = import.meta.env.VITE_API_SERVER_URL;

  constructor(persistent = false) {
    this.storage = createStorage(persistent)
  }

  private getFallback(key: string): string | null {
    const transient = createStorage(false)
    const persistent = createStorage(true)
    return transient.get(key) || persistent.get(key)
  }

  success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
      this.storage.store('token', json.token)
      this.storage.store('email', json.email)
      onSuccess()
    })
  }

  failure(response: Response, onFailure: () => void) {
    response.json().then((json) => {
      console.log(json.message)
      onFailure()
    })
  }

  currentUser() {
    if (!this.isLoggedIn()) {
      return null
    }
    return {
      email: this.getFallback('email')
    }
  }

  isLoggedIn() {
    return Boolean(this.getFallback('token'))
  }

  signOut(andThen = () => { }) {
    const transient = createStorage(false)
    const persistent = createStorage(true)
    transient.remove('token')
    transient.remove('email')
    persistent.remove('token')
    persistent.remove('email')
    andThen()
  }

  async signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
    const endpoint = 'sign_in';

    const body = {
      login: {
        email,
        password,
      }
    }
    fetch(`${this.apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess)
      } else {
        this.failure(response, onFailure)
      }
    })
  }

  async signUp(email: string, password: string, password_confirmation: string, onSuccess: () => void, onFailure: () => void) {
    const endpoint = 'sign_up';

    const body = {
      user: {
        email,
        password,
        password_confirmation,
        role: "seller"
      }
    }
    fetch(`${this.apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess)
      } else {
        this.failure(response, onFailure)
      }
    })
  }
}
export { Auth }