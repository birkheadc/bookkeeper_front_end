import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function verifyPassword(password) {
  if (getApiUrl() == null) {
    Utils.devlog("Api url not set, aborting.");
    throw "Api url not configured.";
  }
  const API_URL = getApiUrl();

  const subDir = "/password/verify";
  const apiUrl = API_URL + subDir;


  Utils.devlog("Attempting to verify password at: " + apiUrl);

  let response;
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': password
      }
    });
  }
  catch {
    Utils.devlog("Unable to connect to verification server.");
    return 404;
  }


  if (response.status === 200) {
    Utils.devlog("Password is correct");
    return 200;
  }
  if (response.status === 404) {
    Utils.devlog("Unable to connect to verification server.");
    return 404;
  }
  Utils.devlog("Password is incorrect.");
  return 401;
}

export default verifyPassword;