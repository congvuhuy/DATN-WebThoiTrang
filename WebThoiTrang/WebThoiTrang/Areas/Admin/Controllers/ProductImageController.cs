using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebThoiTrang.Models;
using WebThoiTrang.Models.EF;

namespace WebThoiTrang.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin,Employee")]

    public class ProductImageController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: Admin/ProductImage
        public ActionResult Index(int id)
        {
            ViewBag.ProductId = id;
            var items = db.ProductImages.Where(x => x.ProductId == id).ToList();
            return PartialView(items);
        }

        [HttpPost]
        public ActionResult AddImage(int productId, string url)
        {
            db.ProductImages.Add(new ProductImage
            {
                ProductId = productId,
                Image = url,
                IsDefault = false
            });
            db.SaveChanges();
            return Json(new { Success = true });
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var item = db.ProductImages.Find(id);
            db.ProductImages.Remove(item);
            db.SaveChanges();
            return Json(new { success = true });
        }
        public ActionResult IsDefault(int id)
        {
            var item = db.ProductImages.Find(id);
            List<ProductImage> proImage = new List<ProductImage>();
            foreach(var i in db.ProductImages)
            {
                if (i.ProductId == item.ProductId)
                {
                    if (i.IsDefault)
                    {
                       i.IsDefault=!i.IsDefault;
                    }
                    
                }
            }
            foreach (var i in db.ProductImages)
            {
                if (i.Id == id)
                {
                    i.IsDefault = !i.IsDefault;
                }
            }
            db.SaveChanges();
            return Json(new { success = true });
        }
    }
}