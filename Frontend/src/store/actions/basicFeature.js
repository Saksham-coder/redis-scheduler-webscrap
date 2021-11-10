import { notification } from "../../util/Notification";
import { readMethod, createMethod, updateMethod, deleteMethod } from './../helpers/axios'

export const createScrap = (scrapData) => async (dispatch) => {
  try {
    const response = await createMethod({ module: 'News', service: 'create', data: {...scrapData} })
    const {
      data: { message },
      status
    } = response;
    status === 200
      ? notification("Created", message, "success", 2000)
      : notification("Try Again", message, "danger", 2000);
    status === 200 &&  dispatch(loadUser());
  } catch (error) {notification("Something went wrong", error, "danger", 3000)}
};

export const updateScrap = (data) => async (dispatch) => {
  try {
    const response = await updateMethod({ module: 'News', service: 'abort', data: {...data} })

    const {
      data: { message },
      status
    } = response;
    status === 200
      ? notification("Updated", message, "success", 2000)
      : notification("Try Again", message, "danger", 2000);
    status === 200 &&  dispatch(loadUser());
  } catch (error) {notification("Something went wrong", error, "danger", 3000)}
};

export const loadUser = () => async (dispatch) => {
  try{
    const response = await readMethod({ module: 'News' })
    const {
      data:{data,message},
      status
    } = response
    status === 200
      ? notification("Data Fetched", message, "success", 2000)
      : notification("Something went wrong", message, "danger", 3000);
    dispatch({
      type: "LOAD_NEWS",
      payload: data,
    });

  } catch (error) {notification("Something went wrong", error, "danger", 3000)}
};

export const deleteScrap = (data) => async (dispatch) => {
  try{
    const response = await deleteMethod({ module: 'News', service: 'delete', data: {...data} })

    const {
      data: { message },
      status
    } = response;
    status === 200
      ? notification("Updated", message, "success", 2000)
      : notification("Try Again", message, "danger", 2000);
    status === 200 &&  dispatch(loadUser());
    
  } catch (error) {notification("Something went wrong", error, "danger", 3000)}
};
