// Validation middleware for school APIs

// Validate add school request
exports.validateAddSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;
  const errors = [];

  // Check if required fields are present
  if (!name || name.trim() === '') {
    errors.push('School name is required');
  }

  if (!address || address.trim() === '') {
    errors.push('School address is required');
  }

  // Validate latitude and longitude
  if (latitude === undefined || latitude === null) {
    errors.push('Latitude is required');
  } else if (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
    errors.push('Latitude must be a valid number between -90 and 90');
  }

  if (longitude === undefined || longitude === null) {
    errors.push('Longitude is required');
  } else if (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
    errors.push('Longitude must be a valid number between -180 and 180');
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // If validation passes, proceed to the controller
  next();
};

// Validate list schools request
exports.validateListSchools = (req, res, next) => {
  const { latitude, longitude } = req.query;
  const errors = [];

  // Validate latitude and longitude
  if (!latitude) {
    errors.push('Latitude is required');
  } else if (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
    errors.push('Latitude must be a valid number between -90 and 90');
  }

  if (!longitude) {
    errors.push('Longitude is required');
  } else if (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
    errors.push('Longitude must be a valid number between -180 and 180');
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // If validation passes, proceed to the controller
  next();
};