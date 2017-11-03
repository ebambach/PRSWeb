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
    public class PurchaseRequestLineItemsController : Controller
    {
        private PRSWebContext db = new PRSWebContext();

		struct prliType {
			public PurchaseRequest PurchaseRequest;
			public IEnumerable<PurchaseRequestLineItem> PurchaseRequestLineItems;
		}

		private void CalcuateTotal(int prid) {
			//This method will be used to calculate the total for a purchase request, when the line
			//items are updated via an Add(), a Change(), or a Remove().

			//First, let's use the prid to locate the PurchaseRequest with the line items.
			var purchaserequestlineitems = db.PurchaseRequestLineItems.Where(p => p.PurchaseRequestId == prid);
			//We'll set an initial Total of 0, making sure that it is a double.
			double Total = 0;

			//Foreach (for all) of the items inside "purchaserequestlineitems," we want to multiply the price,
			//which is stored in "purchaserequestlineitem.Product.Price" by the number of the item, which is
			//in "purchaserequestlineitem.Quantity"
			foreach (var purchaserequestlineitem in purchaserequestlineitems) {
				Total += (purchaserequestlineitem.Product.Price * purchaserequestlineitem.Quantity);
			}

			//We did use "Where" up above to make sure we were working with the correct PurchaseRequest,
			//but we did not store that anywhere, so we need to do that here.
			var purchaseRequest = db.PurchaseRequests.Find(prid);

			//Now that we know "Where" we are going again, we can update the Total.
			purchaseRequest.Total = Total;

			//As always, need to save the changes to make the database reflect what we did.
			db.SaveChanges();
		}

		//Returns all of the purchaserequestlineitems as an array
		public ActionResult List() {
			//return Json(db.PurchaseRequestLineItems.ToList(), JsonRequestBehavior.AllowGet);
			return new JsonNetResult { Data = db.PurchaseRequestLineItems.ToList() };
		}

		//Returns a specific, valid purchaserequestlineitem
		public ActionResult Get(int? id) {
			//If the id is a null value, return an error message saying so
			if (id == null) {
				return Json(new Msg { Result = "Failure", Message = "Id is null." }, JsonRequestBehavior.AllowGet);
			}
			else {
				//The id was not null, time to set up a purchaserequestlineitem variable
				PurchaseRequestLineItem purchaserequestlineitem = db.PurchaseRequestLineItems.Find(id);
				
				//If the id used for the purchaserequestlineitem variable is incorrect, return an error message saying so
				if (purchaserequestlineitem == null) {
					return Json(new Msg { Result = "Failure", Message = $"The entered id, {id}, was not found." }, JsonRequestBehavior.AllowGet);
				}
				else {
					//Now that we have made it past the if checks, let's return the purchaserequestlineitem
					//return Json(purchaserequestlineitem, JsonRequestBehavior.AllowGet);
					return new JsonNetResult { Data = purchaserequestlineitem };
				}
			}
		}

		//Unlike the above Get(), which retrieves a single purchaserequestlineitem,
		//GetById() retrieves every purchaserequestlineitem that belong to a specified
		//purchaseRequest.
		public ActionResult GetById(int? id) {
			//If the id is a null value, return an error message saying so
			if (id == null) {
				return Json(new Msg { Result = "Failure", Message = "Id is null." }, JsonRequestBehavior.AllowGet);
			}
			else {
				//The id was not null, time to set up a purchaserequestlineitem variable
				var purchaseRequest = db.PurchaseRequests.Find(id);

				//If the id used for the purchaserequestlineitem variable is incorrect, return an error message saying so
				if (purchaseRequest == null) {
					return Json(new Msg { Result = "Failure", Message = $"The entered purchase request id, {id}, was not found." }, JsonRequestBehavior.AllowGet);
				}
				else {
					//lineitems is "every line item that belongs to the purchase request"
					var lineitems = db.PurchaseRequestLineItems.Where(p => p.PurchaseRequestId == id).ToList();
					var prli = new prliType { PurchaseRequest = purchaseRequest, PurchaseRequestLineItems = lineitems };
					return new JsonNetResult { Data = prli };
				}
			}
		}

		//[FromBody] uses web api as a substitute for [Bind(Include = "Id,PurchaseRequestId,ProductId,Quantity")]
		//(so long as we remember to change the [HttpPost] annotations to [System.Web.Mvc.HttpPost], to show we are using Mvc
		public ActionResult Add([FromBody] PurchaseRequestLineItem purchaserequestlineitem) {
			//Let's make sure we have a valid purchaserequestlineitem
			if (purchaserequestlineitem == null || purchaserequestlineitem.Quantity <= 0) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchase request line item was invalid." }, JsonRequestBehavior.AllowGet);
			}
			
			//A purchase request line item has a foreign key tying it into a purchase request and a product, let's make sure that valid
			//keys were assigned.
			PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(purchaserequestlineitem.PurchaseRequestId);
			Product product = db.Products.Find(purchaserequestlineitem.ProductId);

			if (purchaseRequest == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchase request line item lacks a valid purchase request." }, JsonRequestBehavior.AllowGet);
			}
			if (product == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchase request line item lacks a valid product." }, JsonRequestBehavior.AllowGet);
			}
			
			//If we have a valid purchaserequestlineitem, we can add the purchaserequestlineitem to the PurchaseRequestLineItems table in the database.
			db.PurchaseRequestLineItems.Add(purchaserequestlineitem);
			
			//Although we used Add() to add the purchaserequestlineitem, the changes we make don't stay changed.
			db.SaveChanges();
			
			//Ok, we added the item(s), let's Calculate the Total.
			CalcuateTotal(purchaserequestlineitem.PurchaseRequestId);
			return Json(new Msg { Result = "Success", Message = "The entered purchase request line item was added to the table." }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([FromBody] PurchaseRequestLineItem purchaserequestlineitem) {
			if (purchaserequestlineitem == null || purchaserequestlineitem.Quantity <= 0) {
				return Json(new Msg { Result = "Failure", Message = $"The entered purchase request line item, with quantity { purchaserequestlineitem.Quantity} was invalid." }, JsonRequestBehavior.AllowGet);
			}
			
			//A purchase request line item has a foreign key tying it into a purchase request and a product, let's make sure that valid
			//keys were assigned.
			var purchaseRequest = db.PurchaseRequests.Find(purchaserequestlineitem.PurchaseRequestId);
			var product = db.Products.Find(purchaserequestlineitem.ProductId);

			if (purchaseRequest == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchase request line item lacks a valid purchase request." }, JsonRequestBehavior.AllowGet);
			}
			if (product == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchase request line item lacks a valid product." }, JsonRequestBehavior.AllowGet);
			}
			
			//As with the Add(), provided we have valid data, it is time to update the purchaserequestlineitem
			//First, we'll make a temporary copy of the purchaserequestlineitem we are changing
			PurchaseRequestLineItem temppurchaserequestlineitem = db.PurchaseRequestLineItems.Find(purchaserequestlineitem.Id);
			if (temppurchaserequestlineitem == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchase request line item was invalid." }, JsonRequestBehavior.AllowGet);
			}
			temppurchaserequestlineitem.ProductId = purchaserequestlineitem.ProductId;
			temppurchaserequestlineitem.PurchaseRequestId = purchaserequestlineitem.PurchaseRequestId;
			temppurchaserequestlineitem.Quantity = purchaserequestlineitem.Quantity;

			//After we make entity framework track all of the fields we may or may not be
			//changing, we use SaveChanges().
			db.SaveChanges();
			
			//Ok, we changed the item(s), let's Calculate the Total.
			CalcuateTotal(purchaserequestlineitem.PurchaseRequestId);
			return Json(new Msg { Result = "Success", Message = "The entered purchaserequestlineitem was changed." }, JsonRequestBehavior.AllowGet);
		}

		//To maintain consistency with the above methods, we are going to pass in the whole
		//purchaserequestlineitem (instead of just the purchaserequestlineitem.Id, which is all we really need to delete).
		public ActionResult Remove([FromBody] PurchaseRequestLineItem purchaserequestlineitem) {
			//This being a way of deleting information, we do not care about the UserName
			//like we did in the above methods, so let's make sure that the PurchaseRequestLineItem.Id is valid.
			if (purchaserequestlineitem == null || purchaserequestlineitem.Id <= 0) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchase request line item was invalid." }, JsonRequestBehavior.AllowGet);
			}
			
			//As with the Change(), we want to make sure entity framework is keeping
			//track of the purchaserequestlineitem we want to delete (and we do just want the Id here).
			PurchaseRequestLineItem temppurchaserequestlineitem = db.PurchaseRequestLineItems.Find(purchaserequestlineitem.Id);
			if (temppurchaserequestlineitem == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered purchase request line item was invalid." }, JsonRequestBehavior.AllowGet);
			}
			
			//Time to save the changes, and remove that purchaserequestlineitem!
			db.PurchaseRequestLineItems.Remove(temppurchaserequestlineitem);
			db.SaveChanges();
			
			//Ok, we removed the item(s), let's Calculate the Total.
			CalcuateTotal(purchaserequestlineitem.PurchaseRequestId);
			return Json(new Msg { Result = "Success", Message = "The entered purchase request line item was removed from the table." }, JsonRequestBehavior.AllowGet);
		}

		// GET: PurchaseRequestLineItems
		public ActionResult Index()
        {
            return View(db.PurchaseRequestLineItems.ToList());
        }

        // GET: PurchaseRequestLineItems/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PurchaseRequestLineItems/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,PurchaseRequestId,ProductId,Quantity")] PurchaseRequestLineItem purchaseRequestLineItem)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseRequestLineItems.Add(purchaseRequestLineItem);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequestLineItem);
        }

        // POST: PurchaseRequestLineItems/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,PurchaseRequestId,ProductId,Quantity")] PurchaseRequestLineItem purchaseRequestLineItem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(purchaseRequestLineItem).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequestLineItem);
        }

        // POST: PurchaseRequestLineItems/Delete/5
        [System.Web.Mvc.HttpPost, System.Web.Mvc.ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            db.PurchaseRequestLineItems.Remove(purchaseRequestLineItem);
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
