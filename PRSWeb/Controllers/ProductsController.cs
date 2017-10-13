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
    public class ProductsController : Controller
    {
        private PRSWebContext db = new PRSWebContext();

		//Returns all of the products as an array
		public ActionResult List() {
			return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
		}

		//Returns a specific, valid product
		public ActionResult Get(int? id) {
			//If the id is a null value, return an error message saying so
			if (id == null) {
				return Json(new Msg { Result = "Failure", Message = "Id is null." }, JsonRequestBehavior.AllowGet);
			}
			else {
				//The id was not null, time to set up a product variable
				Product product = db.Products.Find(id);
				//If the id used for the product variable is incorrect, return an error message saying so
				if (product == null) {
					return Json(new Msg { Result = "Failure", Message = $"The entered id, {id}, was not found." }, JsonRequestBehavior.AllowGet);
				}
				else {
					//Now that we have made it past the if checks, let's return the product
					return Json(product, JsonRequestBehavior.AllowGet);
				}
			}
		}

		//[FromBody] uses web api as a substitute for [Bind(Include = "Id,VendorPartNumber,Name,Price,Unit,Photopath,VendorId")]
		//(so long as we remember to change the [HttpPost] annotations to [System.Web.Mvc.HttpPost], to show we are using Mvc
		public ActionResult Add([FromBody] Product product) {
			//Let's make sure we have a valid product
			if (product == null || product.Name == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered product was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//A product has a foreign key tying it into a vendor, let's make sure that a valid
			//key was assigned.
			Vendor vendor = db.Vendors.Find(product.VendorId);
			if (vendor == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered product lacks a valid vendor." }, JsonRequestBehavior.AllowGet);
			}
			//If we have a valid product, we can add the product to the Products table in the database.
			db.Products.Add(product);
			//Although we used Add() to add the product, the changes we make don't stay changed.
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered product was added to the table of products." }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([FromBody] Product product) {
			if (product == null || product.Name == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered product was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//A product has a foreign key tying it into a vendor, let's make sure that a valid
			//key was assigned.
			Vendor vendor = db.Vendors.Find(product.VendorId);
			if (vendor == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered product lacks a valid vendor." }, JsonRequestBehavior.AllowGet);
			}
			//As with the Add(), provided we have valid data, it is time to update the product
			//First, we'll make a temporary copy of the product we are changing
			Product tempProduct = db.Products.Find(product.Id);
			if (tempProduct == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered product was invalid." }, JsonRequestBehavior.AllowGet);
			}
			tempProduct.VendorPartNumber = product.VendorPartNumber;
			tempProduct.Name = product.Name;
			tempProduct.Price = product.Price;
			tempProduct.Unit = product.Unit;
			tempProduct.Photopath = product.Photopath;
			tempProduct.VendorId = product.VendorId;

			//After we make entity framework track all of the fields we may or may not be
			//changing, we use SaveChanges().
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered product was changed." }, JsonRequestBehavior.AllowGet);
		}

		//To maintain consistency with the above methods, we are going to pass in the whole
		//product (instead of just the product.Id, which is all we really need to delete).
		public ActionResult Remove([FromBody] Product product) {
			//This being a way of deleting information, we do not care about the UserName
			//like we did in the above methods, so let's make sure that the Product.Id is valid.
			if (product == null || product.Id <= 0) {
				return Json(new Msg { Result = "Failure", Message = "The entered product was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//As with the Change(), we want to make sure entity framework is keeping
			//track of the product we want to delete (and we do just want the Id here).
			Product tempProduct = db.Products.Find(product.Id);
			if (tempProduct == null) {
				return Json(new Msg { Result = "Failure", Message = "The entered product was invalid." }, JsonRequestBehavior.AllowGet);
			}
			//Time to save the changes, and remove that product!
			db.Products.Remove(tempProduct);
			db.SaveChanges();
			return Json(new Msg { Result = "Success", Message = "The entered product was removed from the table of products." }, JsonRequestBehavior.AllowGet);
		}

		// GET: Products
		public ActionResult Index()
        {
			//We need the foreign key of the Vendor, as these products will reference
			//who sells them
            var products = db.Products.Include(p => p.Vendor);
            return View(products.ToList());
        }

        // GET: Products/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            ViewBag.VendorId = new SelectList(db.Products, "Id", "Code");
            return View();
        }

        // POST: Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,VendorPartNumber,Name,Price,Unit,Photopath,VendorId")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.VendorId = new SelectList(db.Products, "Id", "Code", product.VendorId);
            return View(product);
        }

        // GET: Products/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            ViewBag.VendorId = new SelectList(db.Products, "Id", "Code", product.VendorId);
            return View(product);
        }

        // POST: Products/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,VendorPartNumber,Name,Price,Unit,Photopath,VendorId")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.VendorId = new SelectList(db.Products, "Id", "Code", product.VendorId);
            return View(product);
        }

        // GET: Products/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Products/Delete/5
        [System.Web.Mvc.HttpPost, System.Web.Mvc.ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
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
