const express = require("express"),
  pollModel = require("../models/pollModel"),
  errorLogModel = require("../models/ErrorLogModel"),
  moment = require("moment"),
  ErrorLogs = require("./errorController");
errorLogModel.errorData.ControllerName = "pollController";

var pollController = {
  getAdminPoll: function (req, res) {
    var get_poll = [];
    var PollData = req.body;
    var offset = PollData.offset;
    var vote_count = [];
    var PollData = [];
    var empty_data = [];
    async function getAdminPollData() {
      try {
        const result1 = await pollModel.activePoll();
        const result2 = await pollModel.inactivePoll();
        const result3 = await pollModel.isDisableStatus();
        const result4 = await pollModel.getAdminPollData(offset);
        if (result4.rows.length > 0) {
          for (var i = 0; i < result4.rows.length; i++) {
            PollData.push(result4.rows[i]["poll_id"]);
          }
          pollModel.getPollVoteCount(PollData, function (err, vote_data) {
            if (err) {
              ErrorLogs.errorResponse(
                res,
                "getAdminPoll",
                "Internal server error",
                500
              );
            } else {
              empty_data.push(vote_data.rows.length);
              for (var i = 0; i < vote_data.rows.length; i++) {
                if (vote_data.rows[i]["mail_poll_id"] == 0) {
                  vote_count.push({
                    poll_id: vote_data.rows[i]["main_poll_id"],
                  });
                } else {
                  vote_count.push({
                    votes: vote_data.rows[i]["votes"],
                    poll_id: vote_data.rows[i]["main_poll_id"],
                  });
                }
              }
              if (result4.rows.length == empty_data.length) {
                for (var i = 0; i < result4.rows.length; i++) {
                  get_poll.push({
                    admin_id: result4.rows[i]["admin_id"],
                    poll_id: result4.rows[i]["poll_id"],
                    poll_options_id: result4.rows[i]["poll_options_id"],
                    poll_subject: result4.rows[i]["poll_subject"],
                    full_name:
                      result4.rows[i]["f_name"] +
                      " " +
                      result4.rows[i]["l_name"],
                    submission_date: result4.rows[i]["submission_date"],
                    d_submission_date: moment(
                      result4.rows[i]["submission_date"]
                    ).format("DD MMM YYYY h:mm A"),
                    poll_status: result4.rows[i]["poll_status"],
                    start_date: result4.rows[i]["start_date"],
                    end_date: result4.rows[i]["end_date"],
                    d_start_date: moment(result4.rows[i]["start_date"]).format(
                      "DD MMM YYYY h:mm A"
                    ),
                    d_end_date: moment(result4.rows[i]["end_date"]).format(
                      "DD MMM YYYY h:mm A"
                    ),
                    cardPostedOn: "",
                    cardLastCommentedOn: "",
                    cardProfileImage: result4.rows[i]["image_path"],
                    poll_cat_id: result4.rows[i]["poll_cat_id"],
                    poll_category_name: result4.rows[i]["poll_category_name"],
                  });
                }
                res.status(200).send({
                  status: true,
                  message: "Data Found Successful",
                  data: get_poll,
                  votes: vote_count,
                });
              } else if (
                empty_data.length == 0 &&
                empty_data.length <= result4.rows.length
              ) {
                ErrorLogs.errorResponse(
                  res,
                  "getAdminPoll",
                  "Something went wrong",
                  400
                );
              }
            }
          });
        } else {
          ErrorLogs.errorResponse(res, "getAdminPoll", "Data Not Found", 404);
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "getAdminPoll",
          "Internal server error",
          500
        );
      }
    }
    getAdminPollData();
  },

  getPoll: function (req, res) {
    var get_poll = [];
    var PollData = req.body;
    var offset = PollData.offset;
    var votes;

    async function GetPolls() {
      try {
        const result1 = await pollModel.activePoll();
        const result2 = await pollModel.inactivePoll();
        const result3 = await pollModel.isDisableStatus();
        const result4 = await pollModel.getPollData(offset);
        if (result4.rows.length > 0) {
          for (var i = 0; i < result4.rows.length; i++) {
            if (result4.rows[i]["vote"] == null) votes = 0;
            else votes = result4.rows[i]["vote"];
            get_poll.push({
              admin_id: result4.rows[i]["admin_id"],
              poll_id: result4.rows[i]["poll_id"],
              poll_options_id: result4.rows[i]["poll_options_id"],
              poll_subject: result4.rows[i]["poll_subject"],
              full_name: "Admin",
              submission_date: result4.rows[i]["submission_date"],
              d_submission_date: moment(
                result4.rows[i]["submission_date"]
              ).format("DD MMM YYYY h:mm A"),
              poll_status: result4.rows[i]["poll_status"],
              start_date: result4.rows[i]["start_date"],
              end_date: result4.rows[i]["end_date"],
              d_start_date: moment(result4.rows[i]["start_date"]).format(
                "DD MMM YYYY"
              ),
              d_end_date: moment(result4.rows[i]["end_date"]).format(
                "DD MMM YYYY"
              ),
              cardProfileImage: result4.rows[i]["image_path"],
              poll_cat_id: result4.rows[i]["poll_cat_id"],
              poll_category_name: result4.rows[i]["poll_category_name"],
              votes: votes,
            });
          }
          res.status(200).send({
            status: true,
            message: "Data Found Successful",
            total_rows: result4.rows[0]["total_rows"],
            data: get_poll,
          });
        } else {
          ErrorLogs.errorResponse(
            res,
            "userMobileOTPVerify",
            "Data Not Found",
            404
          );
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "userRegistration",
          "Internal server error",
          500
        );
      }
    }
    GetPolls();
  },

  getPollCategory: function (req, res) {
    async function GetPollCategoryData() {
      try {
        const result1 = await pollModel.pollCategory();
        if (result1.rows.length > 0) {
          res.status(200).send({
            status: true,
            message: "Data Found Successful",
            data: result1.rows,
          });
        } else {
          ErrorLogs.errorResponse(
            res,
            "getPollCategory",
            "Data Not Found",
            404
          );
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "getPollCategory",
          "Internal server error",
          500
        );
      }
    }
    GetPollCategoryData();
  },

  addPoll: function (req, res) {
    var PollData = req.body;
    var user_id = PollData.user_id;
    var poll_subject = PollData.poll_subject;
    var poll_cat_id = PollData.poll_cat_id;
    var start_date = PollData.start_date;
    var end_date = PollData.end_date;
    var answer_choice = PollData.answer_choice;
    var question_type = PollData.question_type_id;
    answer_choice = answer_choice.filter((a) => a);
    if (answer_choice.length > 10 || answer_choice.length < 2) {
      ErrorLogs.errorResponse(
        res,
        "addPoll",
        "Options cannot be more than 10",
        403
      );
    } else {
      if (start_date > end_date) {
        ErrorLogs.errorResponse(
          res,
          "addPoll",
          "start_date greater than end_date",
          403
        );
      } else {
        async function RegisterPollData() {
          try {
            const result1 = await pollModel.checkDuplicateSubject(poll_subject);
            if (result1.rows.length > 0) {
              ErrorLogs.errorResponse(
                res,
                "checkDuplicateSubject",
                "Duplicate Subject Found",
                400
              );
            } else {
              const result2 = await pollModel.searchOptionId();
              if (result2.rows.length) {
                var id,
                  count = 0;
                if (result2.rows.length == 0) {
                  id = 0;
                } else {
                  id = result2.rows[0]["poll_options_id"];
                }
                var options_id = id + 1;
                pollModel.addPollOptions(
                  options_id,
                  answer_choice,
                  function (err, OptionsData) {
                    if (err) {
                      ErrorLogs.errorResponse(
                        res,
                        "addPoll",
                        "Internal server error",
                        500
                      );
                    } else if (OptionsData.rows.length > 0) {
                      if (
                        OptionsData.rows[0]["option_index"] ==
                        answer_choice.length
                      ) {
                        var new_option_id =
                          OptionsData.rows[0]["poll_options_id"];
                        pollModel.addPollData(
                          poll_subject,
                          new_option_id,
                          start_date,
                          end_date,
                          user_id,
                          question_type,
                          poll_cat_id,
                          function (err, PollData) {
                            if (err) {
                              ErrorLogs.errorResponse(
                                res,
                                "addPoll",
                                "Internal server error",
                                500
                              );
                            } else {
                              if (PollData.rows.length > 0) {
                                res.status(201).send({
                                  status: true,
                                  message: "Data Insert Successful",
                                });
                              } else {
                                ErrorLogs.errorResponse(
                                  res,
                                  "addPoll",
                                  "Failed to insert data",
                                  400
                                );
                              }
                            }
                          }
                        );
                      }
                    } else {
                      count = count + 1;
                      if (count == answer_choice.length) {
                        ErrorLogs.errorResponse(
                          res,
                          "addPollOptions",
                          "Duplicate Data Found",
                          400
                        );
                      }
                    }
                  }
                );
              } else {
                ErrorLogs.errorResponse(
                  res,
                  "addPoll",
                  "Something went wrong",
                  400
                );
              }
            }
          } catch (error) {
            ErrorLogs.errorResponse(
              res,
              "addPoll",
              "Internal server error",
              500
            );
          }
        }
        RegisterPollData();
      }
    }
  },

  getPollById: function (req, res) {
    var PollData = req.body;
    var user_id = PollData.user_id;
    var poll_id = PollData.poll_id;
    var DBPollData = [],
      option_name_list = [],
      d_option_name_list = [];
    var question, ans_vote;
    async function GetPollByIDData() {
      try {
        const result1 = await pollModel.getPollById(poll_id);
        if (result1.rows.length > 0) {
          for (var i = 0; i < result1.rows.length; i++) {
            option_name_list.push(result1.rows[i]["option_name"]);
            d_option_name_list.push({
              poll_options_id: result1.rows[i]["poll_options_id"],
              option_index: result1.rows[i]["option_index"],
              option_name: result1.rows[i]["option_name"],
            });
          }
          if (result1.rows[0]["question_type"] == "single") question = 0;
          else question = 1;
          const result2 = await pollModel.getUserAnswerVote(user_id, poll_id);
          if (result2.rows.length > 0) {
            ans_vote = result2.rows[0]["answer_vote"].split(/[{}"]+/);
          } else ans_vote = [];
          DBPollData = {
            admin_id: result1.rows[0]["admin_id"],
            poll_id: result1.rows[0]["poll_id"],
            image_path: result1.rows[0]["image_path"],
            full_name:
              result1.rows[0]["f_name"] + " " + result1.rows[0]["l_name"],
            poll_subject: result1.rows[0]["poll_subject"],
            start_date: moment(result1.rows[0]["start_date"]).format(
              "DD MMM YYYY"
            ),
            end_date: moment(result1.rows[0]["end_date"]).format("DD MMM YYYY"),
            question_type: result1.rows[0]["question_type"],
            d_question_type: question,
            is_disable: result1.rows[0]["is_disable"],
            poll_cat_id: result1.rows[0]["poll_cat_id"],
            poll_category_name: result1.rows[0]["poll_category_name"],
            is_voted: true,
            voted_answer: ans_vote,
            option_name: option_name_list,
            d_option_name: d_option_name_list,
          };
          res.status(200).send({
            status: true,
            message: "Data Found Successful",
            data: DBPollData,
          });
        } else {
          ErrorLogs.errorResponse(res, "getPollById", "Data Not Found", 404);
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "getPollById",
          "Internal server error",
          500
        );
      }
    }
    GetPollByIDData();
  },

  updatePoll: function (req, res) {
    var PollData = req.body;
    var start_date = PollData.start_date;
    var start_date_flag = PollData.start_date_flag;
    var end_date = PollData.end_date;
    var end_date_flag = PollData.end_date_flag;
    var user_id = PollData.user_id;
    var poll_id = PollData.poll_id;
    var is_disable = PollData.is_disable;

    if (start_date > end_date) {
      ErrorLogs.errorResponse(res, "updatePoll", "Internal server error", 500);
    } else {
      async function UpdatePollData() {
        try {
          const result1 = await pollModel.updatePoll(
            poll_id,
            start_date,
            start_date_flag,
            end_date,
            end_date_flag,
            user_id,
            is_disable
          );
          if (result1.rows.length > 0) {
            const result2 = await pollModel.activePoll();
            const result3 = await pollModel.setCounterZero(poll_id);
            if (result3.rows.length > 0) {
              var d_poll_options_id = result3.rows[0]["poll_options_id"];
              const result4 = await pollModel.setResetVoteAsDelete(
                d_poll_options_id,
                poll_id
              );
              const result5 = await pollModel.setActiveStatusFalse();
              res.status(200).send({
                status: true,
                message: "Data Updated Successful",
              });
            } else {
              res.status(200).send({
                status: true,
                message: "Data updated Successful",
              });
            }
          } else {
            ErrorLogs.errorResponse(
              res,
              "updatePoll",
              "Something went wrong",
              400
            );
          }
        } catch (error) {
          ErrorLogs.errorResponse(
            res,
            "updatePoll",
            "Internal server error",
            500
          );
        }
      }
      UpdatePollData();
    }
  },

  deletePoll: function (req, res) {
    async function DeletePollData() {
      try {
        const result1 = await pollModel.deletePoll(req.body.poll_id);
        if (result1.rows.length > 0) {
          res.status(200).send({
            status: true,
            message: "Data Deleted Successful",
            data: result1.rows,
          });
        } else {
          ErrorLogs.errorResponse(
            res,
            "deletePoll",
            "Failed to delete data",
            400
          );
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "deletePoll",
          "Internal server error",
          500
        );
      }
    }
    DeletePollData();
  },

  mostTrendingPoll: function (req, res) {
    var mostTrendingPoll = req.body;
    var offset = mostTrendingPoll.offset;
    var MostTrending = [];
    var CommentCount;

    async function mostTrendingPollData() {
      try {
        const result1 = await pollModel.mostTrendingPoll(offset);
        if (result1.rows.length > 0) {
          for (var i = 0; i < result1.rows.length; i++) {
            if (result1.rows[i]["vote"] == null) CommentCount = 0;
            else CommentCount = result1.rows[i]["vote"];
            MostTrending.push({
              poll_id: result1.rows[i]["poll_id"],
              poll_topic_id: result1.rows[i]["poll_topic_id"],
              title: result1.rows[i]["title"],
              poll_subject: result1.rows[i]["poll_subject"],
              poll_options_id: result1.rows[i]["poll_options_id"],
              start_date: moment(result1.rows[i]["start_date"]).format(
                "DD MMM YYYY"
              ),
              end_date: moment(result1.rows[i]["end_date"]).format(
                "DD MMM YYYY"
              ),
              submission_date: moment(
                result1.rows[i]["submission_date"]
              ).format("DD MMM YYYY"),
              admin_id: result1.rows[i]["admin_id"],
              poll_status: result1.rows[i]["poll_status"],
              is_disable: result1.rows[i]["is_disable"],
              poll_active_status: result1.rows[i]["poll_active_status"],
              posted_by: "Admin",
              image: result1.rows[i]["image_path"],
              full_name: "Admin",
              d_submission_date: moment(
                result1.rows[i]["submission_date"]
              ).format("DD MMM YYYY"),
              d_start_date: moment(result1.rows[i]["start_date"]).format(
                "DD MMM YYYY"
              ),
              d_end_date: moment(result1.rows[i]["end_date"]).format(
                "DD MMM YYYY"
              ),
              cardProfileImage: result1.rows[i]["image_path"],
              poll_cat_id: result1.rows[i]["poll_cat_id"],
              poll_category_name: result1.rows[i]["poll_category_name"],
              votes: CommentCount,
            });
          }
          res.status(200).send({
            status: true,
            message: "Data Found Successful",
            total_rows: result1.rows[0]["total_rows"],
            data: MostTrending,
          });
        } else {
          ErrorLogs.errorResponse(
            res,
            "mostTrendingPoll",
            "Data Not Found",
            404
          );
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "mostTrendingPoll",
          "Internal server error",
          500
        );
      }
    }
    mostTrendingPollData();
  },

  mostDiscussPoll: function (req, res) {
    var mostDiscussPoll = req.body;
    var offset = mostDiscussPoll.offset;
    var MostDiscussed = [];
    var CommentCount;
    async function mostDiscussPollData() {
      try {
        const result1 = await pollModel.mostTDiscussPoll(offset);
        if (result1.rows.length > 0) {
          for (var i = 0; i < result1.rows.length; i++) {
            if (result1.rows[i]["vote"] == null) CommentCount = 0;
            else CommentCount = result1.rows[i]["vote"];
            MostDiscussed.push({
              poll_id: result1.rows[i]["poll_id"],
              poll_topic_id: result1.rows[i]["poll_topic_id"],
              title: result1.rows[i]["title"],
              poll_subject: result1.rows[i]["poll_subject"],
              poll_options_id: result1.rows[i]["poll_options_id"],
              start_date: moment(result1.rows[i]["start_date"]).format(
                "DD MMM YYYY"
              ),
              end_date: moment(result1.rows[i]["end_date"]).format(
                "DD MMM YYYY"
              ),
              submission_date: moment(
                result1.rows[i]["submission_date"]
              ).format("DD MMM YYYY"),
              admin_id: result1.rows[i]["admin_id"],
              poll_status: result1.rows[i]["poll_status"],
              is_disable: result1.rows[i]["is_disable"],
              poll_active_status: result1.rows[i]["poll_active_status"],
              main_poll_id: result1.rows[i]["main_poll_id"],
              posted_by: "Admin",
              image: result1.rows[i]["image_path"],
              full_name: "Admin",
              d_submission_date: moment(
                result1.rows[i]["submission_date"]
              ).format("DD MMM YYYY "),
              d_start_date: moment(result1.rows[i]["start_date"]).format(
                "DD MMM YYYY "
              ),
              d_end_date: moment(result1.rows[i]["end_date"]).format(
                "DD MMM YYYY "
              ),
              cardProfileImage: result1.rows[i]["image_path"],
              poll_cat_id: result1.rows[i]["poll_cat_id"],
              poll_category_name: result1.rows[i]["poll_category_name"],
              votes: CommentCount,
            });
          }
          res.status(200).send({
            status: true,
            message: "Data Found Successful",
            total_rows: result1.rows[0]["total_rows"],
            data: MostDiscussed,
          });
        } else {
          ErrorLogs.errorResponse(
            res,
            "mostDiscussPoll",
            "Data Not Found",
            404
          );
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "mostDiscussPoll",
          "Internal server error",
          500
        );
      }
    }
    mostDiscussPollData();
  },

  votePoll: function (req, res) {
    var PollData = req.body;
    var user_id = PollData.user_id;
    var token = PollData.token;
    var poll_id = PollData.poll_id;
    var answer_choice = PollData.poll_vote;
    var answer_arr = [];
    var count = 0;
    for (var i = 0; i < answer_choice.length; i++) {
      answer_arr.push(answer_choice[i]["option_name"]);
    }
    var db_poll_options_id = answer_choice[0]["poll_options_id"];
    if (answer_choice.length > 10 || answer_choice.length < 1) {
      ErrorLogs.errorResponse(
        res,
        "votePoll",
        "Options cannot be more than 10",
        403
      );
    } else {
      async function PollVotes() {
        let count = 0;
        try {
          const result1 = await pollModel.CheckDuplicateVote(poll_id, user_id);
          if (result1.rows.length > 0) {
            ErrorLogs.errorResponse(res, "votePoll", "Already Voted", 403);
          } else {
            if (answer_arr[0] != undefined) {
              const result2 = await pollModel.VotePollData(
                PollData,
                answer_arr,
                db_poll_options_id
              );
              const result3 = await pollModel.updateIsReactive(poll_id);
              for (i = 0; i < answer_choice.length; i++) {
                let result4 = await pollModel.logVoteCount(
                  answer_choice[i]["poll_options_id"],
                  answer_choice[i]["option_index"]
                );
                if (result4.rows.length > 0) {
                  count = count + 1;
                } else {
                  ErrorLogs.errorResponse(
                    res,
                    "votePoll",
                    "Internal server error",
                    500
                  );
                }
              }
              if (answer_choice.length == count) {
                res.status(201).send({
                  status: true,
                  message: "Vote Added Successful",
                });
              } else {
                ErrorLogs.errorResponse(res, "votePoll", "Failed to vote", 400);
              }
            } else {
              ErrorLogs.errorResponse(res, "votePoll", "Failed to vote", 400);
            }
          }
        } catch (error) {
          ErrorLogs.errorResponse(
            res,
            "votePoll",
            "Internal server error",
            500
          );
        }
      }
      PollVotes();
    }
  },

  getPollAnalytics: function (req, res) {
    var PollData = req.body;
    var poll_id = PollData.poll_id;
    var PollData = {};
    var db_option_name = [];
    var db_vote_count = [];
    var d_vote_count = [];
    var letter_data = [];
    async function PollAnalytics() {
      try {
        const result1 = await pollModel.PollAnalytics(poll_id);
        if (result1.rows.length > 0) {
          for (var i = 0; i < result1.rows.length; i++) {
            db_option_name.push(result1.rows[i]["option_name"]);
            db_vote_count.push({
              option_name: result1.rows[i]["option_name"],
              vote_count: result1.rows[i]["vote_count"],
            });
            d_vote_count.push(result1.rows[i]["vote_count"]);
            letter_data.push((i + 10).toString(36));
          }
          PollData = {
            poll_subject: result1.rows[0]["poll_subject"],
            start_date: moment(result1.rows[0]["start_date"]).format(
              "DD MMM YYYY h:mm A"
            ),
            end_date: moment(result1.rows[0]["end_date"]).format(
              "DD MMM YYYY h:mm A"
            ),
            option_name: db_option_name,
            vote_count: db_vote_count,
            d_vote_count: d_vote_count,
            labels: letter_data,
          };
          res.status(200).send({
            status: false,
            message: "Vote Successful",
            data: PollData,
          });
        } else {
          ErrorLogs.errorResponse(
            res,
            "getPollAnalytics",
            "Failed to vote",
            400
          );
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "getPollAnalytics",
          "Internal server error",
          500
        );
      }
    }
    PollAnalytics();
  },

  searchPoll: function (req, res) {
    var get_poll = [];
    var PollData = req.body;
    var search_text = PollData.search_text;
    var votes;
    async function SearchPollData() {
      try {
        const result1 = await pollModel.searchPollData(search_text);
        if (result1.rows.length > 0) {
          for (var i = 0; i < result1.rows.length; i++) {
            if (result1.rows[i]["vote"] == null) votes = 0;
            else votes = result1.rows[i]["vote"];
            get_poll.push({
              admin_id: result1.rows[i]["admin_id"],
              poll_id: result1.rows[i]["poll_id"],
              poll_options_id: result1.rows[i]["poll_options_id"],
              poll_subject: result1.rows[i]["poll_subject"],
              full_name:
                result1.rows[i]["f_name"] + " " + result1.rows[i]["l_name"],
              submission_date: result1.rows[i]["submission_date"],
              d_submission_date: moment(
                result1.rows[i]["submission_date"]
              ).format("DD MMM YYYY h:mm A"),
              poll_status: result1.rows[i]["poll_status"],
              start_date: result1.rows[i]["start_date"],
              end_date: result1.rows[i]["end_date"],
              d_start_date: moment(result1.rows[i]["start_date"]).format(
                "DD MMM YYYY h:mm A"
              ),
              d_end_date: moment(result1.rows[i]["end_date"]).format(
                "DD MMM YYYY h:mm A"
              ),
              cardProfileImage: result1.rows[i]["image_path"],
              poll_cat_id: result1.rows[i]["poll_cat_id"],
              poll_category_name: result1.rows[i]["poll_category_name"],
              votes: votes,
            });
          }
          res.status(200).send({
            status: true,
            message: "Data Found Successful",
            data: get_poll,
          });
        } else {
          ErrorLogs.errorResponse(res, "searchPoll", "Data Not Found", 404);
        }
      } catch (error) {
        ErrorLogs.errorResponse(
          res,
          "searchPoll",
          "Internal server error",
          500
        );
      }
    }
    SearchPollData();
  },
};
module.exports = pollController;
