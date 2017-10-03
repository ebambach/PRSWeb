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
    public class VendorsController : Controller
    {
        private PRSWebContext db = new PRSWebContext();

		//Returns all of the vendors as an array
		public ActionResult List() {
			return Json(db.Vendors.ToList(), JsonRequestBehavior.AllowGet);
		}

		//Returns a specific, valid vendor
		public ActionResult Get(int? id) {
			//If the id is a null value, return an error message saying so
			if (id == null) {
				return Json(new Msg { Result = "Failure", Message = "Id is null." }, JsonRequestBehavior.AllowGet);
			}
			else {
				//The id was not null, time to set up a vendor variable
				Vendor vendor = db.Vendors.Find(id);
				//If the id used for the vendor variable is incorrect, return an error message saying so
				if (vendor == null) {
					return Json(new Msg { Result = "Failure", Message = $"The entered id, {id}, was not found." }, JsonRequestBehavior.AllowGet);
				}
				else {
					//Now that we have made it past the if checks, let's return the vendor
					return Json(vendor, JsonRequestBehavior.AllowGet);
				}
			}
		}

		//[FromBody] uses web api as a substitute for [Bind(Include = "Id,Code,Name,Address,City,State,Zip,Phone,Email,PreApproved")]
		//(so long as we remember to change the [HttpPost] annotations to [System.Web.Mvc.HttpPost], to show we are using Mvc
		public ActionResult Add([FromBody] Vendor vendor) {
			//Let's make sure we have a valid vendor
			if (vendor == null || vendor.Name == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered vendor was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//If we have a valid vendor, we can add the vendor to the Vendors table in the database.
			db.Vendors.Add(vendor);
			//Although we used Add() to add the vendor, the changes we make don't stay changed.
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered vendor was added to the table of vendors." }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([FromBody] Vendor vendor) {
			if (vendor == null || vendor.Name == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered vendor was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//As with the Add(), provided we have valid data, it is time to update the vendor
			//First, we'll make a temporary copy of the vendor we are changing
			Vendor tempVendor = db.Vendors.Find(vendor.Id);
			if (tempVendor == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered vendor was invalid." }, JsonRequestBehavior.AllowGet);
			}
			tempVendor.Code = vendor.Code;
			tempVendor.Name = vendor.Name;
			tempVendor.Address = vendor.Address;
			tempVendor.City = vendor.City;
			tempVendor.State = vendor.State;
			tempVendor.Zip = vendor.Zip;
			tempVendor.Phone = vendor.Phone;
			tempVendor.Email = vendor.Email;
			tempVendor.PreApproved = vendor.PreApproved;
			
			//After we make entity framework track all of the fields we may or may not be
			//changing, we use SaveChanges().
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered vendor was changed." }, JsonRequestBehavior.AllowGet);
		}

		//To maintain consistency with the above methods, we are going to pass in the whole
		//vendor (instead of just the vendor.Id, which is all we really need to delete).
		public ActionResult Remove([FromBody] Vendor vendor) {
			//This being a way of deleting information, we do not care about the UserName
			//like we did in the above methods, so let's make sure that the Vendor.Id is valid.
			if (vendor == null || vendor.Id <= 0) {
				return Json(new Msg { Result = "Failure", Message = "The entered vendor was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//As with the Change(), we want to make sure entity framework is keeping
			//track of the vendor we want to delete (and we do just want the Id here).
			Vendor tempVendor = db.Vendors.Find(vendor.Id);
			if (tempVendor == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered vendor was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//Time to save the changes, and remove that vendor!
			db.Vendors.Remove(tempVendor);
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered vendor was removed from the table of vendors." }, JsonRequestBehavior.AllowGet);
		}

		// GET: Vendors
		public ActionResult Index()
        {
            return View(db.Vendors.ToList());
        }

        // GET: Vendors/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vendor vendor = db.Vendors.Find(id);
            if (vendor == null)
            {
                return HttpNotFound();
            }
            return View(vendor);
        }

        // GET: Vendors/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Vendors/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Code,Name,Address,City,State,Zip,Phone,Email,PreApproved")] Vendor vendor)
        {
            if (ModelState.IsValid)
            {
                db.Vendors.Add(vendor);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(vendor);
        }

        // GET: Vendors/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vendor vendor = db.Vendors.Find(id);
            if (vendor == null)
            {
                return HttpNotFound();
            }
            return View(vendor);
        }

        // POST: Vendors/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Code,Name,Address,City,State,Zip,Phone,Email,PreApproved")] Vendor vendor)
        {
            if (ModelState.IsValid)
            {
                db.Entry(vendor).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(vendor);
        }

        // GET: Vendors/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vendor vendor = db.Vendors.Find(id);
            if (vendor == null)
            {
                return HttpNotFound();
            }
            return View(vendor);
        }

        // POST: Vendors/Delete/5
        [System.Web.Mvc.HttpPost, System.Web.Mvc.ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Vendor vendor = db.Vendors.Find(id);
            db.Vendors.Remove(vendor);
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
