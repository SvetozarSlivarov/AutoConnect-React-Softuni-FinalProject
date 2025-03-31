export default function validateCarForm(carData) {
	const errors = {};

	if (!carData.brand.trim()) errors.brand = "Brand is required.";
	if (!carData.model.trim()) errors.model = "Model is required.";
	if (!carData.year || isNaN(carData.year) || carData.year < 1900 || carData.year > new Date().getFullYear())
		errors.year = "Enter a valid year.";
	if (!carData.price || isNaN(carData.price) || carData.price <= 0)
		errors.price = "Enter a valid price.";
	if (!carData.power || isNaN(carData.power) || carData.power <= 0)
		errors.power = "Enter a valid power.";
	if (!carData.mileage || isNaN(carData.mileage) || carData.mileage < 0)
		errors.mileage = "Enter a valid mileage.";
	if (!carData.color.trim()) errors.color = "Color is required.";
	if (carData.description.trim().length < 10)
		errors.description = "Description must be at least 10 characters.";

	if ((carData.existingImages.length + carData.newImages.length) === 0)
		errors.images = "At least one image is required.";
    if (carData.newImages.length + carData.existingImages.length > 5) {
        errors.images = "Maximum 5 images allowed (total).";
      }
	return errors;
}