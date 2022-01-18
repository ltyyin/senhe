/**
 * 本地存储封装模块
 */

/* 在localStorage中获取 */
export const getItem = name => {
  const data = window.localStorage.getItem(name)

  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/* 在localStorage中存放 */
export const setItem = (name, value) => {
  if (typeof value !== 'string') {
    window.localStorage.setItem(name, JSON.stringify(value))
    return
  }

  window.localStorage.setItem(name, value)
}

/* 在localStorage中获取 */
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
