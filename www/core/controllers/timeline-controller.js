sociallirioapp.controller('TimelineController', ['$http', function($http) {
	
	var self = this;
	
	self.init = function() {
		self.atualizar();
	}
	
	self.atualizar = function() {
		$http.get('https://sociallirio.firebaseio.com/posts.json').then(function(resp) {	
			self.posts = [];
			angular.forEach(resp.data, function(post, id) {
				post.id = id;
				self.posts.push(post);
			})
		});
	}				
	

	self.postSave = function(post) {
		var _id = Math.floor((Math.random() * 9999) + 1) + "w" + Date.now();
		$http.put('https://sociallirio.firebaseio.com/posts/'+_id+'.json', post).then(function(resp) {
			self.post = {};
			self.atualizar();
		}, function(error) {
			alert(error.data);
		});
	}				
	
	self.excluir = function(id) {
		
		var _confirm = confirm("Deseja realmente excluir post?");
		if(!_confirm) return;
		
		$http.delete('https://sociallirio.firebaseio.com/posts/'+id+'.json').then(function(resp) {
			self.atualizar();
		}, function(error) {
			alert(error.data);
		});
	}				
	
	

	self.init();
	
}]);