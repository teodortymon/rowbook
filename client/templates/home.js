 Bert.defaults = {
            hideDelay: 10000,
            // Accepts: a number in milliseconds.
            style: 'fixed-bottom',
            // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
            // growl-bottom-left, growl-bottom-right.
            type: 'info'
            // Accepts: default, success, info, warning, danger.
          };

// AutoForm.setDefaultTemplate('materialize');
AccountsTemplates.addField({
        _id: 'name',
        type: 'text',
        required: true,
        displayName: 'Name & Surname',
    });
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      // minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
  },
  pwd
]);

Template.usersList.helpers({
	users() {
		return Meteor.users.find();
	}
});
Template.group.helpers({
	convert (userId){
		return Meteor.users.findOne(userId);
	},
});
Template.trainingsList.helpers({
	trainings (){
		return Trainings.find();
	},
});
Template.boat.helpers({
	BoatType (a){
		// console.log(BoatTypes.findOne(this.type));
		return BoatTypes.findOne(this.type)[a];
	},
});

Template.adminView.onCreated(function() {
	this.autorun(() => {
		this.subscribe('users');
		this.subscribe('groups');
		this.subscribe('boats');
		this.subscribe('boatTypes');
		this.subscribe('trainings');
		this.subscribe('allNotifications');
		// this.subscribe('events');
	});
});
	

Template.adminView.onRendered(function(){
	this.autorun(() => {
	    if (this.subscriptionsReady()) {
	    	Tracker.afterFlush(() => {
				$('.collapsible').collapsible();
				// console.log("Collapsible ON!");
				$('.dropdown-button').dropdown({
				     inDuration: 300,
				     outDuration: 225,
				     constrain_width: false, // Does not change width of dropdown to that of the activator
				     // hover: true, // Activate on hover
				     // gutter: 50, // Spacing from edge
				     belowOrigin: true, // Displays dropdown below the button
				     alignment: 'right' // Displays dropdown with edge aligned to the left of button
				   }
				 );
			});
		}
	}); 
});

Template.notificationsDropdown.events({
	'click .notification': function(event){
		// console.log(event.target.id);
		Meteor.call('readNotification', event.target.id);

	}
})