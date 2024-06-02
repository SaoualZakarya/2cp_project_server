import Enquiry from '../modules/enquiry.js';
import validateMongoDbId from '../utils/validate_mongodb_id.js';
import User from '../modules/user.js';
import createNotification from '../utils/notifcation.js';

// Create Enquiry
const createEnquiry = async (req, res, next) => {
    const { comment, projectId, serviceId } = req.body;
    const email = req.user.email;

    const validCharacters = /^[a-zA-Z0-9\s.,!?]+$/;

    try {
        if (!validCharacters.test(comment)) {
            return res.status(400).json({ success: false, message: "Invalid characters in the comment" });
        }

        // Determine which ID to nullify
        let updatedProjectId = projectId || null;
        let updatedServiceId = serviceId || null;

        if (projectId) {
            updatedServiceId = null;
        } else if (serviceId) {
            updatedProjectId = null;
        }

        const newEnquiry = await Enquiry.create({
            comment,
            email,
            projectId: updatedProjectId,
            serviceId: updatedServiceId
        });

        const user = await User.findOne({ role: 'admin' });

        createNotification(`New enquiry from ${email}`, user._id, 'enquiry');

        res.json({ success: true, message: "Enquiry created successfully" });
    } catch (err) {
        next(err);
    }
};

// Update Enquiry status
const updateEnquiry = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    const statusList = ["In progress", "Contacted"];

    try {
        validateMongoDbId(id);
        if (!statusList.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, {
            status
        }, { new: true });

        res.json({ success: true, message: "Enquiry status updated successfully" });
    } catch (err) {
        next(err);
    }
};
// Delete Enquiry
const deleteEnquiry = async (req, res, next) => {
    const { id } = req.params;

    try {
        validateMongoDbId(id);
        await Enquiry.findByIdAndDelete(id);
        res.json({ success: true, message: 'Enquiry deleted successfully' });
    } catch (err) {
        next(err);
    }
};

// Get Enquiry
const getEnquiry = async (req, res, next) => {
    const { id } = req.params;
    try {
        validateMongoDbId(id);
        const enquiry = await Enquiry.findById(id)
            .populate('projectId', 'title reservedCount')
            .populate('serviceId', 'service numEnroled');
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }
        res.json({ success: true, data: enquiry });
    } catch (err) {
        next(err);
    }
};

// Get all Enquiries
const getAllEnquiry = async (req, res, next) => {
    try {
        const enquiries = await Enquiry.find()
            .populate('projectId', 'title reservedCount')
            .populate('serviceId', 'service numEnroled');
        res.json({ success: true, data: enquiries });
    } catch (err) {
        next(err);
    }
};

export default {
    getAllEnquiry,
    getEnquiry,
    deleteEnquiry,
    updateEnquiry,
    createEnquiry
};