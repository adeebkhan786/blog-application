

export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
}

// jb humaare paas bahut bdaa content hota hai lekin hum use saara na dikhaane ke bajaaye chahte hain ki (...) me dikha de to hum ellipsis ka use krte hain jaise -
//{ adeeb khan ka website hai ye} ---- {adeeb khan ka.....}
export const addEllipsis = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + '...' : str;
};


export const getType = (value, body) => {
  // debugger;
  if (value.params) {
    return { params: body }
  } else if (value.query) {
    if (typeof body === 'object') {
      return { query: body._id }
    } else {
      return { query: body }
    }
  }
  return {};
}