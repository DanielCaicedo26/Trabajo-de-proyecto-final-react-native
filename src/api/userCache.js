// src/api/userCache.js
let userData = null;
let documentInfo = null;

export function setUser(user) {
  userData = user;
}

export function getUser() {
  return userData;
}

export function setDocumentInfo(docInfo) {
  documentInfo = docInfo;
}

export function getDocumentInfo() {
  return documentInfo;
}
