export const validateData = (res, body) => {
  let rule_field = body.rule.field;
  let rule_cvalue = body.rule.condition_value;
  let rule_condition = body.rule.condition;
  let data = body.data;

  let isValid = false;

  const valid = {
    code: 200,
    message: `field ${rule_field} successfully validated.`,
    status: 'success',
    data: {
      validation: {
        error: false,
        field: rule_field,
        field_value: data[rule_field],
        condition: rule_condition,
        condition_value: rule_cvalue,
      },
    },
  };

  const invalid = {
    code: 400,
    message: `field ${rule_field} failed validation.`,
    status: 'error',
    data: {
      validation: {
        error: true,
        field: rule_field,
        field_value: data[rule_field],
        condition: rule_condition,
        condition_value: rule_cvalue,
      },
    },
  };

  if (data.constructor === Array && rule_condition === 'contains') {
    isValid = data.includes(rule_field);
    isValid ? (valid.data = valid.data) : (invalid.data = null);
    isValid
      ? (valid.data = valid.data)
      : (invalid.message = `field ${rule_field} is missing from data.`);
  }

  if (typeof data === 'object' && data.constructor !== Array) {
    if (rule_field.includes('.')) {
      if (data[rule_field.split('.')[0]] === undefined) {
        isValid = false;
        isValid ? (valid.data = valid.data) : (invalid.data = null);
        isValid
          ? (valid.data = valid.data)
          : (invalid.message = `field ${rule_field} is missing from data.`);
      } else {
        data = { ...data, ...data[rule_field.split('.')[0]] };
        rule_field = rule_field.split('.')[1];
      }
    }

    if (data[rule_field] === undefined) {
      isValid = false;
      isValid ? (valid.data = valid.data) : (invalid.data = null);
      isValid
        ? (valid.data = valid.data)
        : (invalid.message = `field ${rule_field} is missing from data.`);
    }

    if (rule_condition === 'eq' && data[rule_field] == rule_cvalue) {
      isValid = true;
    }

    if (rule_condition === 'neq' && data[rule_field] != rule_cvalue) {
      isValid = true;
    }

    if (rule_condition === 'gt' && data[rule_field] > rule_cvalue) {
      isValid = true;
    }

    if (rule_condition === 'gte' && data[rule_field] >= rule_cvalue) {
      isValid = true;
    }
  }

  res.status(isValid ? valid.code : invalid.code).json({
    message: isValid ? valid.message : invalid.message,
    status: isValid ? valid.status : invalid.status,
    data: isValid ? valid.data : invalid.data,
  });
};
