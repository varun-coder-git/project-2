
// Poll routes
/** 
 * @swagger 
 * definitions:
 *   GetAdminPollModel:
 *     properties:
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Poll/GetPolls: 
*   post: 
*     description: Get polls.
*     tags:
*     - Poll
*     summary: Get polls.
*     parameters: 
*     - name: Model 
*       description: Get polls.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetAdminPollModel'
*     produces:
*       - application/json
*     responses:        
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*/

/** 
 * @swagger 
 * definitions:
 *   GetPollModel:
 *     properties:
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Poll/GetRecentPoll: 
*   post: 
*     description: Get Recent polls.
*     tags:
*     - Poll
*     summary: Get Recent polls.
*     parameters: 
*     - name: Model 
*       description: Get polls.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetPollModel'
*     produces:
*       - application/json
*     responses:        
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*/

// Poll routes
/** 
 * @swagger 
 * definitions:
 *   GetPollCategoryModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Poll/GetCategory: 
*   post: 
*     description: Get Polls Category.
*     tags:
*     - Poll
*     summary: Get Polls Category.
*     parameters: 
*     - name: Model 
*       description: Get Polls Category.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetPollCategoryModel'
*     produces:
*       - application/json
*     responses:        
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*/

/** 
 * @swagger 
 * definitions:
 *   AddPollModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       poll_subject:
 *         type: string
 *         required: true
 *       start_date:
 *         type: string
 *         required: true
 *       end_date:
 *         type: string
 *         required: true
 *       answer_choice:
 *         type: array
 *         items:
 *          type: string
 *          required: true
 *       question_type_id:
 *         type: string
 *         required: true
 *       poll_cat_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Poll/RegisterPoll: 
*   put: 
*     description: Register Poll.
*     tags:
*     - Poll
*     summary: Register Poll.
*     parameters: 
*     - name: Model 
*       description: Register Poll.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AddPollModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Inserted Successful.
*       400:
*         description: Duplicate Data Found/Failed to insert data/Something went wrong.    
*       401: 
*         description: Failed to authenticate token.
*       403: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   UpdatePollModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       start_date:
 *         type: string
 *         required: true
 *       start_date_flag:
 *         type: boolean
 *         required: true
 *       end_date:
 *         type: string
 *         required: true
 *       end_date_flag:
 *         type: boolean
 *         required: true
 *       poll_id:
 *         type: integer
 *         required: true
 *       is_disable:
 *         type: boolean
 *         required: true
 */
/** 
 * @swagger
/Poll/UpdatePoll: 
*   put: 
*     description: Update poll.
*     tags:
*     - Poll
*     summary: Update poll.
*     parameters: 
*     - name: Model 
*       description: Update poll.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdatePollModel'
*     produces:
*       - application/json
*     responses:   
*       200: 
*         description: Data Updated Successful.
*       400:
*         description: Something went wrong. 
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error.
*       
*   
*/


/** 
 * @swagger 
 * definitions:
 *   GetPollIDModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       admin_id:
 *         type: integer
 *         required: true
 *       poll_id:
 *         type: integer
 *         required: true
 *       poll_options_id:
 *         type: integer
 *         required: true
 *      
 */
/** 
 * @swagger
/Poll/GetPollById: 
*   post: 
*     description: Get polls by ID.
*     tags:
*     - Poll
*     summary: Get polls by ID.
*     parameters: 
*     - name: Model 
*       description:  Get polls by ID.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetPollIDModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.  
*       403: 
*         description: Failed to authenticate token.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*      
*     
*/


/** 
 * @swagger 
 * definitions:
 *   DeletePollModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       poll_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Poll/DeletePoll: 
*   post: 
*     description: Delete poll.
*     tags:
*     - Poll
*     summary: Delete poll.
*     parameters: 
*     - name: Model 
*       description: Delete poll.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeletePollModel'
*     produces:
*       - application/json
*     responses:    
*       200: 
*         description:Data Deleted Successful.
*       400: 
*         description: Failed to delete data.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error.
*   
*/


/** 
 * @swagger 
 * definitions:
 *   MostTrendingPollModel:
 *     properties:
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Poll/MostTrending: 
*   post: 
*     description: Get Most Trending Polls.
*     tags:
*     - Poll
*     summary: Get Most Trending Polls.
*     parameters: 
*     - name: Model 
*       description: Get Most Trending Polls.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/MostTrendingPollModel'
*     produces:
*       - application/json
*     responses:    
*       200: 
*         description:Data Found Successful
*       401: 
*         description: Failed to authenticate token.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   MostDiscussPollModel:
 *     properties:
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Poll/MostDiscussed: 
*   post: 
*     description: Get Most Discuss Polls.
*     tags:
*     - Poll
*     summary: Get Most Discuss Polls.
*     parameters: 
*     - name: Model 
*       description: Get Most Discuss Polls.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/MostDiscussPollModel'
*     produces:
*       - application/json
*     responses:    
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*   
*/


/** 
 * @swagger 
 * definitions:
 *   VotePollModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       poll_vote:
 *         type: array
 *         items:
 *          type: string
 *          required: true
 *       poll_id:
 *          type: integer
 *          required: true
 * 
 */
/** 
 * @swagger
/Poll/VotePoll: 
*   put: 
*     description: Vote Poll.
*     tags:
*     - Poll
*     summary: Vote Poll.
*     parameters: 
*     - name: Model 
*       description: Vote Poll.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/VotePollModel'
*     produces:
*       - application/json
*     responses:    
*       200: 
*         description: Vote Successful.
*       400: 
*         description: Failed to vote.
*       401: 
*         description: Failed to authenticate token.
*       403: 
*         description: Options cannot be more than 10/Already Voted.
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetPollAnalyticsModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       poll_id:
 *          type: integer
 *          required: true
 */
/** 
 * @swagger
/Poll/PollAnalytics: 
*   post: 
*     description: Get Poll Analytics.
*     tags:
*     - Poll
*     summary: Get Poll Analytics.
*     parameters: 
*     - name: Model 
*       description:  Get Poll Analytics.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetPollAnalyticsModel'
*     produces:
*       - application/json
*     responses:    
*       200: 
*         description: Vote Successful.
*       400: 
*         description: Failed to vote.
*       401: 
*         description:  Failed to authenticate token.
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   SearchPollModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       search_text:
 *          type: string
 *          required: true
 */
/** 
 * @swagger
/Poll/Search: 
*   post: 
*     description: Search Poll Data.
*     tags:
*     - Poll
*     summary: Search Poll Data.
*     parameters: 
*     - name: Model 
*       description: Search Poll Data.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/SearchPollModel'
*     produces:
*       - application/json
*     responses:    
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*   
*/