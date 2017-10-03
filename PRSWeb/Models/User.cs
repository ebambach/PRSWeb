using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PRSWeb.Models {
	public class User {
		public int Id { get; set; }

		[StringLength(30)]		
		[Required]
		//^Limits the length of a string to however many characters we say it 
		//will have, and says that the variable is not nullable
		//This must come before each variable we want it to apply to.
		[Index(IsUnique = true)]
		//^Ensures that any variables with this annotation must be unique.  As
		//we are setting up users, we certainly want to apply this to the UserName.
		public string UserName { get; set; }

		[StringLength(30)]
		[Required]
		public string Password { get; set; }

		[StringLength(30)]
		[Required]
		public string FirstName { get; set; }

		[StringLength(30)]
		[Required]
		public string LastName { get; set; }

		[StringLength(12)]
		[Required]
		public string Phone { get; set; }

		[StringLength(60)]
		[Required]
		public string Email { get; set; }

		[Required]
		public bool IsReviewer { get; set; }

		[Required]
		public bool IsAdmin { get; set; }
	}
}