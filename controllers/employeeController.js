import User from "../models/User.js";
import Feedback from "../models/feedbackModal.js";

export const employee = async (req, res) => {
  let employeeAssignedForReview = [];
  const assignReviewIds = req.user.reviewAssigned;

  let feedbackByOther = [];
  const feedbacksIds = req.user.feedbackByOthers;

  if (assignReviewIds.length > 0) {
    for (let i = 0; i < assignReviewIds.length; i++) {
      let employee = await User.findById(assignReviewIds[i]);

      if (employee) {
        employeeAssignedForReview.push(employee);
      }
    }
  }

  if (feedbacksIds.length > 0) {
    for (let i = 0; i < feedbacksIds.length; i++) {
      let feedback = await Feedback.findById(feedbacksIds[i]).populate(
        "reviewer",
        "name"
      );

      if (feedback) {
        feedbackByOther.push(feedback);
      }
    }
  }

  res.render("employee", {
    user: req.user,
    title: "Employee | Dashboard",
    assignReviews: employeeAssignedForReview,
    feedbacks: feedbackByOther,
  });
};

export const addReview = async (req, res) => {
  try {
    const recipient = req.query.id;
    const reviewer = req.user._id;
    const { comment } = req.body;

    const feedbackId = await Feedback.create({
      comment,
      reviewer,
      recipient,
    });

    const recipientEmployee = await User.findById(recipient);

    recipientEmployee.feedbackByOthers.push(feedbackId);

    await recipientEmployee.save();

    const reviewerEmployee = await User.findById(reviewer);

    const assignedReviews = reviewerEmployee.reviewAssigned;

    const newAssignedReview = assignedReviews.filter(
      (review) => JSON.stringify(review) !== JSON.stringify(recipient)
    );

    reviewerEmployee.reviewAssigned = newAssignedReview;

    await reviewerEmployee.save();

    return res.redirect("back");
  } catch (error) {
    console.log("adding review error ", error);
  }
};
