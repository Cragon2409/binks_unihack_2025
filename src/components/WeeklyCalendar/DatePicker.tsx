/**
 * This file was adapted from https://github.com/codeuniversity/antd-weekly-calendar 
 * under a MIT licence
 */

import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";

export const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;