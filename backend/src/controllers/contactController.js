import Contact from '../models/Contact.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create contact form submission
    const contact = new Contact({
      name,
      email,
      message
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit contact form'
    });
  }
}; 