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

  find(value, node = this.root) {
  	// let node = this.root;

  	//for when there is no such value
  	if(!node){
  		return 'no such value';
  	}

  	if(node.data === value){
  		return node
  	}else if(value < node.data){
  		return this.find(value, node.left);
  	}else if(value > node.data){
  		return this.find(value, node.right);
  	}
  }
  
  levelOrder(pFunction){
  	//pfunction is function that this function takes as a parameter

  	let node = this.root;
  	if(!node){
  		throw "there is no binary tree"
  	}
  	let queue = [node];
  	let levelOrder = [];

  	while(queue.length > 0){
  		if(queue[0].left){
  			queue.push(queue[0].left);
  		}
  		if(queue[0].right){
  			queue.push(queue[0].right);
  		}
  		levelOrder.push(queue[0]);
  		queue.shift();
  	}

  	if(pFunction){
  		pFunction(levelOrder);
  	}else{
  		return levelOrder;
  	}
  }

  inorder(node = this.root, arr = [], pFunction) {
  	//pfunction is function that this function takes as a parameter
  	if(!node){
  		return
  	}
  	if(node.left){
  		this.inorder(node.left, arr);
  	}

  	arr.push(node.data);

  	if(node.right){
  		this.inorder(node.right, arr);
  	}
  	if(pFunction){
  		pFunction(arr);
  	}else{
  		return arr;
  	}
  }

  preorder(node = this.root, arr = [], pFunction) {
  	//pfunction is function that this function takes as a parameter
  	if(!node){
  		return
  	}

  	arr.push(node.data);

  	if(node.left){
  		this.preorder(node.left, arr);
  	}

  	if(node.right){
  		this.preorder(node.right, arr);
  	}

  	return arr;
  }

  postorder(node = this.root, arr = [], pFunction) {
  	//pfunction is function that this function takes as a parameter
  	if(!node){
  		return
  	}

  	if(node.left){
  		this.postorder(node.left, arr);
  	}

  	if(node.right){
  		this.postorder(node.right, arr);
  	}

  	arr.push(node.data);

  	return arr;
  }

  height(node = this.root, leftH = 0, rightH = 0){
  	if(!node){
  		return
  	}

  	if(node.left){
  		leftH++;
  		leftH = this.height(node.left, leftH, rightH);
  	}else if(node.right){
  		rightH++;
  		leftH = this.height(node.right, leftH, rightH);
  	}

  	if(leftH > rightH){
  		return leftH
  	}else{
  		return rightH
  	}

  }

}

function printNodeCb(arr) {
  	for(i in arr){
  		console.log(arr[i]);
  	}
  }

arr1 = [5, 8, 15, 55, 68, 5, 2, 7, 99];
let tree = new Tree(arr1);
// console.log(tree.root);
// tree.insert(9);
// tree.delete(68);
prettyPrint(tree.root);
// console.log(tree.root.left.left.left);
// console.log(tree.find(55))
// console.log(tree.levelOrder());
// tree.levelOrder(printNodeCb);
// console.log(tree.postorder())
console.log(tree.height(tree.root.right.right))
