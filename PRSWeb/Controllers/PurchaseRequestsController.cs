﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PRSWeb.Models;
using System.Web.Http;
using Utility;

namespace PRSWeb.Controllers
{
    public class PurchaseRequestsController : Controller
    {
        private PRSWebContext db = new PRSWebContext();

		//Returns all of the products as an array
		public ActionResult List() {
			//return Json(db.PurchaseRequests.ToList(), JsonRequestBehavior.AllowGet);
			//^The above doesn't work like it did with the previous controllers, because
			//we need to work with the two DateTime variables in a PurchaseRequest.
			//Instead of doing that, we call the JsonNetResult, in the Utility folder,
			//so that instead of getting the milliseconds since epoch, we get a time
			//value that Javascript can read
			return new JsonNetResult { Data = db.PurchaseRequests.ToList() };
		}

		//Returns a specific, valid purchaseRequest
		public ActionResult Get(int? id) {
			//If the id is a null value, return an error message saying so
			if (id == null) {
				return Json(new Msg { Result = "Failure", Message = "Id is null." }, JsonRequestBehavior.AllowGet);
			}
			else {
				//The id was not null, time to set up a purchaseRequest variable
				PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
				//If the id used for the purchaseRequest variable is incorrect, return an error message saying so
				if (purchaseRequest == null) {
					return Json(new Msg { Result = "Failure", Message = $"The entered id, {id}, was not found." }, JsonRequestBehavior.AllowGet);
				}
				else {
					//Now that we have made it past the if checks, let's return the purchaseRequest
					//return Json(purchaseRequest, JsonRequestBehavior.AllowGet);
					//^Still working with DateTime, so can't use the above again, need to
					//call JsonNetResult instead
					return new JsonNetResult { Data = purchaseRequest };
					}
			}
		}

		//[FromBody] uses web api as a substitute for [Bind(Include = "Id,VendorPartNumber,Name,Price,Unit,Photopath,VendorId")]
		//(so long as we remember to change the [HttpPost] annotations to [System.Web.Mvc.HttpPost], to show we are using Mvc
		public ActionResult Add([FromBody] PurchaseRequest purchaseRequest) {
			//Let's make sure we have a valid purchaseRequest
			if (purchaseRequest == null || purchaseRequest.Description == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchaseRequest was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//A purchaseRequest has a foreign key tying it into a user, let's make sure that a valid
			//key was assigned.
			var user = db.Users.Find(purchaseRequest.UserId);
			if (user == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchaseRequest lacks a valid user." }, JsonRequestBehavior.AllowGet);
			}
			Console.Write(purchaseRequest);
			//If we have a valid purchaseRequest, we can add the purchaseRequest to the PurchaseRequests table in the database.
			db.PurchaseRequests.Add(purchaseRequest);
			//Although we used Add() to add the purchaseRequest, the changes we make don't stay changed.
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered purchaseRequest was added to the table of products." }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([FromBody] PurchaseRequest purchaseRequest) {
			if (purchaseRequest == null || purchaseRequest.Description == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchaseRequest was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//A purchaseRequest has a foreign key tying it into a user, let's make sure that a valid
			//key was assigned.
			var user = db.Users.Find(purchaseRequest.UserId);
			if (user == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchaseRequest lacks a valid user." }, JsonRequestBehavior.AllowGet);
			}
			//As with the Add(), provided we have valid data, it is time to update the purchaseRequest
			//First, we'll make a temporary copy of the purchaseRequest we are changing
			PurchaseRequest tempPurchaseRequest = db.PurchaseRequests.Find(purchaseRequest.Id);
			if (tempPurchaseRequest == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchaseRequest was invalid." }, JsonRequestBehavior.AllowGet);
			}
			tempPurchaseRequest.Description = purchaseRequest.Description;
			tempPurchaseRequest.Justification = purchaseRequest.Justification;
			tempPurchaseRequest.RejectionReason = purchaseRequest.RejectionReason;
			tempPurchaseRequest.DateNeeded = purchaseRequest.DateNeeded;
			tempPurchaseRequest.DeliveryMode = purchaseRequest.DeliveryMode;
			tempPurchaseRequest.Status = purchaseRequest.Status;
			tempPurchaseRequest.Total = purchaseRequest.Total;
			tempPurchaseRequest.SubmittedDate = purchaseRequest.SubmittedDate;
			tempPurchaseRequest.UserId = purchaseRequest.UserId;

			//After we make entity framework track all of the fields we may or may not be
			//changing, we use SaveChanges().
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered purchaseRequest was changed." }, JsonRequestBehavior.AllowGet);
		}

		//To maintain consistency with the above methods, we are going to pass in the whole
		//purchaseRequest (instead of just the purchaseRequest.Id, which is all we really need to delete).
		public ActionResult Remove([FromBody] PurchaseRequest purchaseRequest) {
			//This being a way of deleting information, we do not care about the UserName
			//like we did in the above methods, so let's make sure that the PurchaseRequest.Id is valid.
			if (purchaseRequest == null || purchaseRequest.Id <= 0) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchaseRequest was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//As with the Change(), we want to make sure entity framework is keeping
			//track of the purchaseRequest we want to delete (and we do just want the Id here).
			PurchaseRequest tempPurchaseRequest = db.PurchaseRequests.Find(purchaseRequest.Id);
			if (tempPurchaseRequest == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchaseRequest was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//Time to save the changes, and remove that purchaseRequest!
			db.PurchaseRequests.Remove(tempPurchaseRequest);
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered purchaseRequest was removed from the table of products." }, JsonRequestBehavior.AllowGet);
		}

		// GET: PurchaseRequests
		public ActionResult Index()
        {
            return View(db.PurchaseRequests.ToList());
        }

        // GET: PurchaseRequests/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PurchaseRequests/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,UserId,Description,Justification,RejectionReason,DateNeeded,DeliveryMode,Status,Total,SubmittedDate")] PurchaseRequest purchaseRequest)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseRequests.Add(purchaseRequest);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequest);
        }

        // POST: PurchaseRequests/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,UserId,Description,Justification,RejectionReason,DateNeeded,DeliveryMode,Status,Total,SubmittedDate")] PurchaseRequest purchaseRequest)
        {
            if (ModelState.IsValid)
            {
                db.Entry(purchaseRequest).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequest);
        }

        // POST: PurchaseRequests/Delete/5
        [System.Web.Mvc.HttpPost, System.Web.Mvc.ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            db.PurchaseRequests.Remove(purchaseRequest);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

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
