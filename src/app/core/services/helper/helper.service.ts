import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  /**
     * Takes an object array list, an item , and delete flag as parameter
     * Adds, updates or deletes and item from the object array list
     * @param state Current store state
     * @param newItem New item to be added/deleted in state
     * @param isDelete Either need to updated to deleted new item
     */
  static updateStore(state: any[], newItem: any, isDelete = false) {
    if (newItem && state) {
      if (Array.isArray(newItem)) { // If newItem is an array
        if (newItem.length) {
          state = [...state, ...newItem];
        }
      } else { // If newItem is object
        const index = state.findIndex(a => (a.id && a.id === newItem.id) || (a._id && a._id === newItem._id));
        if (index > -1) {
          if (isDelete) {
            state.splice(index, 1);
          } else {
            state[index] = newItem;
          }
        } else {
          state.push(newItem);
        }
      }
    }
    return state;
  }

  /**
   * Removes duplicates from array.
   * @param inputArray
   * @returns Unique Array
   */
  removeDuplicate(inputArray: any) {
    const uniqueArray = inputArray.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === inputArray.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });

    return uniqueArray;
  }

  /**
  * Returns Last updated status of contact
  * @param dateString
  * @returns Last updated status of given contact
  */
  showLastUpdatedStatus(dateString: string) {
    let lastDate = new Date(dateString);
    let dateToday = new Date();
    let timeDiff = dateToday.getTime() - lastDate.getTime();
    let dayDiff = timeDiff / (1000 * 3600 * 24);
    if (Math.ceil(dayDiff) < 29) {
      if (Math.ceil(dayDiff) === 0) {
        // Hour
        return { class: 'fresh', text: 'Last verified', time_span: '24 H', icon_class: 'pi pi-check' }
      } else {
        // Days
        return { class: 'fresh', text: 'Last verified', time_span: `${Math.ceil(dayDiff)} D`, icon_class: 'pi pi-check' }
      }
    } else if (Math.ceil(dayDiff) > 29 && Math.ceil(dayDiff) < 90) {
      // Days
      return { class: 'old', text: 'Last verified', time_span: `${Math.ceil(dayDiff)} D`, icon_class: 'pi pi-clock' }
    } else if (Math.ceil(dayDiff) > 90) {
      // Days
      return { class: 'outdated', text: 'Last verified > 90 days+', time_span: '', icon_class: 'fa fa-exclamation-triangle' }
    } else {
      // Days
      return { class: 'outdated', text: 'Last verified > 90 days+', time_span: '', icon_class: 'fa fa-exclamation-triangle' }
    }
  }

  /**
   *
   * @param dateString
   * @returns date in mm/dd/yyyy US format
   */
  createUsLocalDate(dateString: any) {
    if (dateString) {
      let dateValue = new Date(dateString);
      return dateValue.toLocaleDateString('en-US');
    } else {
      return null;
    }
  }

  /**
   * Navigates to specified url in new browser tab.
   * @param url
   */
  visitLink(url: string) {
    if (url && url.length) {
      window.open(url, "_blank");
    }
  }

  /**
   * This method return the array of specified keys from give list.
   * @param list
   * @param key
   * @returns
   */
  retrieveKeys(list: [], key: string, isLowerCase: boolean = false) {
    if (list && list.length) {
      if (isLowerCase) {
        let updatedList = list.map((obj: any) => obj[`${key}`]);
        updatedList.forEach((ele: string) => { if (ele) { ele.toLowerCase } });
        return updatedList;
      } else {
        return list.map((obj: any) => obj[`${key}`]);
      }
    } else {
      return [];
    }
  }

  /**
   * Returns the clean json object by omitting null & empty values.
   * @param jsonObject
   * @returns
   */
  cleanJson(jsonObject: any) {
    return this.removeEmpty(jsonObject);
  }

  /**
   * This method deletes the null, empty array & empty map from json object.
   * @param obj
   * @returns
   */
  private removeEmpty(obj: any) {
    Object.keys(obj).forEach(key => {
      if (obj[key] != null && obj[key].length == 0) {
        delete obj[key];
      } else if (obj[key] && typeof obj[key] === "object") {
        this.removeEmpty(obj[key]);
      } else if (obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  };

  /**
   * Returns the upper case of initial. Makes dealsignal As Dealsignal.
   * @param str
   * @returns
   */
  upperCaseInitial(str: string) {
    let head = str.slice(0, 1).toUpperCase();
    let tail = str.slice(1);
    return head + tail;
  }

  /**
   *
   * @param inputArray
   * @param elementToDelete
   * @returns Array by removing specified element.
   */
  deleteElement(inputArray: any, elementToDelete: any) {
    let newIndex = inputArray.indexOf(elementToDelete);
    if (newIndex !== -1) {
      inputArray.splice(newIndex, 1);
    }

    return inputArray;
  }

  /**
   * This method takes array of string as input.
   * And returns array of objects by adding `id` & `name`.
   * @param inputPlainArray
   * @param isLowerCaseKeys this determine the case of `id`.
   * @returns Array of objects by adding `id` & `name`.
   */
  buildNameAndIdObject(inputPlainArray: [], isLowerCaseKeys: boolean = true) {
    if (inputPlainArray.length) {
      let tempArray = [];
      inputPlainArray.forEach((kwd: any) => {
        if (kwd.length) {
          tempArray.push({
            id: isLowerCaseKeys ? kwd.toLowerCase() : kwd,
            name: kwd
          })
        }
      });
      return tempArray;
    } else {
      return [];
    }
  }

  /**
   * This Method adds `name` key to the array of object.
   * @param inputArrayOfObject
   * @param key This the key from which we copy the value to assign `name` key.
   * @returns Array of object with `name` key.
   */
  addNameKey(inputArrayOfObject: [], key: any) {
    if (inputArrayOfObject.length) {
      inputArrayOfObject.forEach((ele: any) => { ele.name = ele[`${key}`] });
      return inputArrayOfObject;
    } else {
      return [];
    }
  }

  /**
   * Returns sorted array based on key.
   * @param inputArray
   * @param key
   * @param sortOder  default is 'ASC'; ascending sort.
   * @returns Array
   */
  sortByKey(inputArray: any, key: any, sortOder: any = 'ASC') {
    if (sortOder == 'DESC') {
      return inputArray.sort((a: any, b: any) => (a[`${key}`] < b[`${key}`]) ? 1 : -1);
    } else {
      return inputArray.sort((a: any, b: any) => (a[`${key}`] > b[`${key}`]) ? 1 : -1);
    }
  }

  /**
   * This method safely copy the array.
   * This method return Array of values instead of array of reference.
   * @param inputArrayOfObject
   * @returns Array.
   */
  safeCopy(inputArrayOfObject: []) {
    return JSON.parse(JSON.stringify(inputArrayOfObject));
  }

  /**
   * Make capital to every initial letter of word of line.
   * @param line
   * @returns String containing word with capital initial word.
   */
  upperCaseInitialWholeLine(line: string) {
    let lineArray = line.split(' ');
    let arrayOfWords = [];
    lineArray.forEach((word: string) => {
      arrayOfWords.push(this.upperCaseInitial(word));
    })

    return arrayOfWords.join(' ');
  }

   /**
  * get status Image
  * @param status
  * @returns
  */
    getStatusImage(status) {
      let image = '';
      if (status.includes('Verified')) {
        image = "assets/icons/time-success.svg";
      } else if (status.includes('Verifying')) {
        image = "assets/icons/timer-secondary.svg";
      } else {
        image = 'assets/icons/timer-warning.svg'
      }
      return image;
    }

    /**
    * get status class
    * @param status
    * @returns
    */
     getStatusClass(status) {
      let statusClass = '';
      if (status.includes('Verified')) {
        statusClass = "success";
      } else if (status.includes('Verifying')) {
        statusClass = "primary";
      } else {
        statusClass = 'warning'
      }
      return statusClass;
    }

    /**
    * get status icon image
    * @param status
    * @returns
    */
    getLeafeIconImage(status) {
      let image = ''
      if (status.includes('Verified')) {
        image = "assets/icons/leafe-verified.svg";
      } else if (status.includes('Verifying')) {
        image = "assets/icons/leafe-secondary.svg";
      } else {
        image = 'assets/icons/leafe-warning.svg'
      }
      return image;
    }

    /**
    * get phone image
    * @param contact
    * @returns
    */
    getPhoneImage(phone_verified) {
      let image = '';
      if (phone_verified === true) {
        image = "assets/icons/phone-verified.svg";
      } else {
        image = 'assets/icons/phone-warning.svg';
      }
      return image;
    }

    /**
    * get meassage image
    * @param contact
    * @returns
    */
    getMessageImage(valid_email) {
      let image = ''
      if (valid_email === true) {
        image = "assets/icons/message-verified.svg";
      } else {
        image = 'assets/icons/message-warning.svg';
      }
      return image;
    }

}
