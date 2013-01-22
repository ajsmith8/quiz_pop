QuizPop.Views.ChallengesResults = Backbone.View.extend({
	
	template: JST['challenges/results'],
	
	events: {
		'click #send_challenge' : 'sendChallenge'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.winner = this.attr.users.where({id: this.challenge.get('winner_id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			challenge: this.challenge,
			user: this.current_user,
			winner: this.winner
		}));
		setTimeout(function() {
			for (i = 0; i < 3; i++) {
				self.renderResult(self.attr.questions.where({id: parseInt(self.challenge.get('question_ids').split('/')[i])})[0]);
			}
		}, 0);
		return this;
	},
	
	renderResult: function(question) {
		var view = new QuizPop.Views.QuestionsResult({
			attr: this.attr,
			challenge: this.challenge,
			question: question
		});
		$('#results').append(view.render().el);
	},
	
	sendChallenge: function(event) {
		if (this.challenge.get('is_finished')) {
			Backbone.history.navigate('new', true);
		} else {
			Backbone.history.navigate('', true);
		}
	}
});