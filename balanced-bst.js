const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
class Node {
	constructor(data, left, right) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		arr.sort(this.compareNumbers);
		arr = arr.filter((item, index) => arr.indexOf(item) === index);

		this.root = this.buildTree(arr);
	}

	compareNumbers(a, b) {
  		return a - b;
	}

	buildTree(arr) {
		if(arr.length === 0){
			return null;
		}

		const mid = Math.floor(arr.length/2);
		const left = arr.slice(0, mid);
		const right = arr.slice(mid+1, arr.length);

		const midNode = new Node(arr[mid]);

		midNode.left = this.buildTree(left);
		midNode.right = this.buildTree(right);

		return midNode
	}
	
}


arr1 = [5,8,15, 55, 68, 5, 2, 7,99];
let tree = new Tree(arr1);
prettyPrint(tree.root);
console.log(tree.root);