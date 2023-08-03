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

	insert(value, node = this.root) {
		if(!node){
			return 'there is no binary tree'
		}

		if(value < node.data){
			if(!node.left){
				const newNode = new Node(value);
				return node.left = newNode;
			}else{
				node = node.left;
				this.insert(value, node);
			}
		}else if(value > node.data){
			if(!node.right){
				const newNode = new Node(value);
				return node.right = newNode;
			}else{
				node = node.right;
				this.insert(value, node);
			}
		}else{
			throw 'integer already in tree'
		}
	}

	delete(value, node = this.root){
      if (node === null) {
        return node;
      }

      if (value < node.data) {
        node.left = this.delete(value, node.left);
      } else if (value > node.data) {
        node.right = this.delete(value, node.right);
      } 

      else {
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }
        else {
          const minData = function findNextSmallestRightData(node) {
            let min = node.data;
            let newRoot = node;

            while (newRoot.left !== null) {
              min = node.left.data;
              newRoot = node.left;
            }

            return min;
          }

          node.data = minData(node.right);
          node.right = this.delete(node.data, node.right)
        }
      }

      return node;
  }
}

arr1 = [5, 8, 15, 55, 68, 5, 2, 7, 99];
let tree = new Tree(arr1);
// console.log(tree.root);
// tree.insert(9);
tree.delete(68)
prettyPrint(tree.root);
// console.log(tree.root.left.left.left);