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
			return Json(new Msg { Result = "Success", Message = $"The entered user, {user} was added to the table of users." }, JsonRequestBehavior.AllowGet);
		}

		/*public ActionResult Change([FromBody] User user) {
			if (user == null || user.UserName == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered user was invalid." }, JsonRequestBehavior.AllowGet);
			}
		}

		public ActionResult Remove([FromBody] User user) {
			if (user == null || user.UserName == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered user was invalid." }, JsonRequestBehavior.AllowGet);
			}
		}*/

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
