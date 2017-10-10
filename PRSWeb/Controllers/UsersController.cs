using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PRSWeb.Models;
using Utility;
using System.Web.Http;

namespace PRSWeb.Controllers
{
    public class UsersController : Controller
    {
        private PRSWebContext db = new PRSWebContext();

		public ActionResult Login(string UserName, string Password) {
			//We'll create a users variable that reads the database for that UserName && Password
				//If successful, it returns an array with that user
				//It will return an empty array if the UserName and Password combination is not found
			var users = db.Users.Where(u => u.UserName == UserName && u.Password == Password);
			return Json(users, JsonRequestBehavior.AllowGet);
		}

		//Returns all of the users as an array
		public ActionResult List() {
			return Json(db.Users.ToList(), JsonRequestBehavior.AllowGet);
		}

		//Returns a specific, valid user
		public ActionResult Get(int? id) {
			//If the id is a null value, return an error message saying so
			if (id == null) {
				return Json(new Msg { Result="Failure", Message="Id is null." }, JsonRequestBehavior.AllowGet);
			}
			else {
				//The id was not null, time to set up a user variable
				User user = db.Users.Find(id);
				//If the id used for the user variable is incorrect, return an error message saying so
				if (user == null) {
					return Json(new Msg { Result = "Failure", Message = $"The entered id, {id}, was not found." }, JsonRequestBehavior.AllowGet);
				}
				else {
					//Now that we have made it past the if checks, let's return the user
					return Json(user, JsonRequestBehavior.AllowGet);
				}
			}
		}

		//[FromBody] uses web api as a substitute for [Bind(Include = "Id,UserName,Password,FirstName,LastName,Phone,Email,IsReviewer,IsAdmin")] 
		public ActionResult Add([FromBody] User user) {
			//Let's make sure we have a valid user
			if (user == null || user.UserName == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered user was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//If we have a valid user, we can add the user to the Users table in the database.
			db.Users.Add(user);
			//Although we used Add() to add the user, the changes we make don't stay changed.
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered user was added to the table of users." }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([FromBody] User user) {
			if (user == null || user.UserName == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered user was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//As with the Add(), provided we have valid data, it is time to update the user
			//First, we'll make a temporary copy of the user we are changing
			User tempUser = db.Users.Find(user.Id);
			if (tempUser == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered user was invalid." }, JsonRequestBehavior.AllowGet);
			}
			tempUser.UserName = user.UserName;
			tempUser.Password = user.Password;
			tempUser.FirstName = user.FirstName;
			tempUser.LastName = user.LastName;
			tempUser.Phone = user.Phone;
			tempUser.Email = user.Email;
			tempUser.IsReviewer = user.IsReviewer;
			tempUser.IsAdmin = user.IsAdmin;
			//After we make entity framework track all of the fields we may or may not be
			//changing, we use SaveChanges().
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered user was changed." }, JsonRequestBehavior.AllowGet);
		}

		//To maintain consistency with the above methods, we are going to pass in the whole
		//user (instead of just the user.Id, which is all we really need to delete).
		public ActionResult Remove([FromBody] User user) {
			//This being a way of deleting information, we do not care about the UserName
			//like we did in the above methods, so let's make sure that the User.Id is valid.
			if (user == null || user.Id <= 0) {
				return Json(new Msg { Result = "Failure", Message = "The entered user was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//As with the Change(), we want to make sure entity framework is keeping
			//track of the user we want to delete (and we do just want the Id here).
			User tempUser = db.Users.Find(user.Id);
			if (tempUser == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered user was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//Time to save the changes, and remove that user!
			db.Users.Remove(tempUser);
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered user was removed from the table of users." }, JsonRequestBehavior.AllowGet);
		}

		#region MVC Methods
		// GET: Users
		public ActionResult Index()
        {
            return View(db.Users.ToList());
        }

        // GET: Users/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // GET: Users/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Users/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,UserName,Password,FirstName,LastName,Phone,Email,IsReviewer,IsAdmin")] User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(user);
        }

        // GET: Users/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,UserName,Password,FirstName,LastName,Phone,Email,IsReviewer,IsAdmin")] User user)
        {
            if (ModelState.IsValid)
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(user);
        }

        // GET: Users/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // POST: Users/Delete/5
        [System.Web.Mvc.HttpPost, System.Web.Mvc.ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            User user = db.Users.Find(id);
            db.Users.Remove(user);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

		#endregion

		protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
