// import mongoose from "mongoose";
// import ProductCombination from "../models/ProductCombination.js";

// export const getProductCombination = async (req, res) => {
//   try {
//     const productCombinations = await ProductCombination.find().populate(
//       "product material"
//     );
//     res.json(productCombinations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const createProductCombination = async (req, res) => {
//   try {
//     const { productId, materialId, gradeIds, title } = req.body;
//     if (!productId || !materialId) {
//       return res
//         .status(400)
//         .json({ message: "Product ID and Material ID are required" });
//     }

//     const productCombination = new ProductCombination({
//       product: productId,
//       material: materialId,
//       grade: gradeIds,
//       title,
//     });

//     const newProductCombination = await productCombination.save();

//     // ✅ Populate `product` and `material` before sending response
//     const populatedCombination = await ProductCombination.findById(
//       newProductCombination._id
//     )
//       .populate("product")
//       .populate("material");

//     res.status(201).json(populatedCombination);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateProductCombination = async (req, res) => {
//   try {
//     const updates = req.body;
//     const productCombination = await ProductCombination.findById(req.params.id);

//     if (!productCombination) {
//       return res.status(404).json({ message: "Product combination not found" });
//     }

//     // Update fields
//     Object.keys(updates).forEach((key) => {
//       productCombination[key] = updates[key];
//     });

//     if (
//       updates.shape ||
//       updates.length ||
//       updates.thickness ||
//       updates.surfaceFinish ||
//       updates.outsideDiameter
//     ) {
//       productCombination.hasDetails = true;
//     }

//     const updatedCombination = await productCombination.save();

//     const populatedCombination = await ProductCombination.findById(
//       updatedCombination._id
//     )
//       .populate("product")
//       .populate("material");

//     res.json(populatedCombination);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };




// export const bulkUpdateProductCombination = async (req, res) => {
//   try {
//     let { ids, updates } = req.body;

//       // 🔴 Debugging logs
//       console.log("Received IDs:", ids);
//       console.log("Type of IDs:", typeof ids);

//     ids = ids.map(id => new mongoose.Types.ObjectId(id));

//     const result = await ProductCombination.updateMany(
//       { _id: { $in: ids } },
//       { $set: { ...updates, hasDetails: true } }
//     );

//     const updatedCombinations = await ProductCombination.find({ _id: { $in: ids } })
//       .populate("product")
//       .populate("material");

//     res.json({
//       message: `Updated ${updatedCombinations.length} product combinations`,
//       updatedCombinations,
//     });
//   } catch (error) {
//     console.error("Bulk Update Error:", error);
//     res.status(400).json({ message: error.message });
//   }
// };




import mongoose from "mongoose";
import ProductCombination from "../models/ProductCombination.js";

export const getProductCombination = async (req, res) => {
  try {
    // Extract filter, search, and sort parameters from query
    const { 
      productId, 
      materialId, 
      searchText,
      sortField = "title",
      sortDirection = "asc" 
    } = req.query;
    
    const filter = {};
    
    if (productId && productId !== '') {
      filter.product = new mongoose.Types.ObjectId(productId);
    }
    
    if (materialId && materialId !== '') {
      filter.material = new mongoose.Types.ObjectId(materialId);
    }
    
    if (searchText && searchText !== '') {
      filter.title = { $regex: searchText, $options: 'i' };
    }
    
    // Build sort object
    const sort = {};
    
    // Handle sorting
    if (sortField === "price") {
      sort.price = sortDirection === "asc" ? 1 : -1;
    } else if (sortField === "title") {
      sort.title = sortDirection === "asc" ? 1 : -1;
    }
    
    // Apply filters and sorting to the query
    const productCombinations = await ProductCombination.find(filter)
      .populate("product material")
      .sort(sort);
      
    res.json(productCombinations);
  } catch (error) {
    console.error("Error fetching product combinations:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createProductCombination = async (req, res) => {
  try {
    const { productId, materialId, gradeIds, title } = req.body;
    if (!productId || !materialId) {
      return res
        .status(400)
        .json({ message: "Product ID and Material ID are required" });
    }

    const productCombination = new ProductCombination({
      product: productId,
      material: materialId,
      grade: gradeIds,
      title,
    });

    const newProductCombination = await productCombination.save();

    const populatedCombination = await ProductCombination.findById(
      newProductCombination._id
    )
      .populate("product")
      .populate("material");

    res.status(201).json(populatedCombination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductCombination = async (req, res) => {
  try {
    const updates = req.body;
    const productCombination = await ProductCombination.findById(req.params.id);

    if (!productCombination) {
      return res.status(404).json({ message: "Product combination not found" });
    }

    // Update fields
    Object.keys(updates).forEach((key) => {
      productCombination[key] = updates[key];
    });

    if (
      updates.shape ||
      updates.length ||
      updates.thickness ||
      updates.surfaceFinish ||
      updates.outsideDiameter
    ) {
      productCombination.hasDetails = true;
    }

    const updatedCombination = await productCombination.save();

    const populatedCombination = await ProductCombination.findById(
      updatedCombination._id
    )
      .populate("product")
      .populate("material");

    res.json(populatedCombination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const bulkUpdateProductCombination = async (req, res) => {
  try {
    let { ids, updates } = req.body;

    // 🔴 Debugging logs
    console.log("Received IDs:", ids);
    console.log("Type of IDs:", typeof ids);

    ids = ids.map(id => new mongoose.Types.ObjectId(id));

    const result = await ProductCombination.updateMany(
      { _id: { $in: ids } },
      { $set: { ...updates, hasDetails: true } }
    );

    const updatedCombinations = await ProductCombination.find({ _id: { $in: ids } })
      .populate("product")
      .populate("material");

    res.json({
      message: `Updated ${updatedCombinations.length} product combinations`,
      updatedCombinations,
    });
  } catch (error) {
    console.error("Bulk Update Error:", error);
    res.status(400).json({ message: error.message });
  }
};