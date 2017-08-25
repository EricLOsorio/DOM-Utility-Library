window.onload = (function () {
                'use strict';

                //start search for ancestor at `startNode`
                //the ancestor selector string is `potentialAncestorString`

				function getAncestorBySelector(startNode,potentialAncestorString){
				  
				  var ancestor = startNode,
				      potentialAncestorNode = document.querySelector(potentialAncestorString);

				  while(ancestor!==null && ancestor!== potentialAncestorNode){
				  	ancestor=ancestor.parentNode;
				  };

				  return ancestor;

				}

				//given a `chosenSelector` string and its node parent find all its siblings belonging to same given node parent.

				function getSiblingBySelector(node, selectorString){ 

				  var parentNode = node,
				      siblings = [],
				      childrenIndex = 0,
				      match = false;

				  try {
				    var chosenSelector = document.querySelector(selectorString),
				      parentChildrenList = Array.from(parentNode.children);				  	
				  } catch (error){
				  	  console.log(`${error}: Check the given node actually exists` )
				  };


				  while( childrenIndex < parentChildrenList.length && !match) {

				    if(chosenSelector.isEqualNode(parentChildrenList[childrenIndex])){
				  	   
				  	   match = true;

				  	   parentChildrenList.splice(childrenIndex,1);
				    }

				    childrenIndex++;

				  };

				  if(match){
				    console.log(`Siblings Collection of given node: `, parentChildrenList);				  	
				  } else {
				  	console.log("The Node given is not the parent of given selector");
				  }

				}

				//given a `newNode` it is inserted after the `nodeAfter`
				//both arguments are actual NODES and not selector strings

				function insertAfter(newNode, nodeAfter){
				  var parent=nodeAfter.parentNode,
				      nodeBefore=nodeAfter.nextElementSibling;

				      if(nodeBefore!==null){
				      	parent.insertBefore(newNode,nodeBefore);
				      } else{
				      	parent.appendChild(newNode);
				      }

				      return newNode;
				}

				//A swap between `element` and `element2` is executed
				//if successful, `true` is returned, otherwise `false` is returned
				//both argurments are actual element nodes

				function swapElements(element1, element2){ 
				  var parent1=element1.parentElement,
				      parent2=element2.parentElement,
				      afterElement1=element1.nextElementSibling,
				      afterElement2=element2.nextElementSibling;

				   if(element1.contains(element2) || element2.contains(element1)){
				     return false;
				   } else{
				       if(afterElement1 !== null){
				         parent1.insertBefore(element2,afterElement1);
					   } else parent1.appendChild(element2);

					   if(afterElement2 !== null){
					     parent2.insertBefore(element1,afterElement2);
					   } else parent2.appendChild(element1);

					   return true;      	
				    }

                }

                //element selected by `cssSelector` string is removed 
                //all the elements that were removed are returned in array

                function removeAll(cssSelector){
				  var toRemove=Array.from(document.querySelectorAll(cssSelector));

				      toRemove.forEach( (node) =>{
				      	node.parentNode.removeChild(node);
				      });

				      return toRemove;

				}

				window.getAncestorBySelector=getAncestorBySelector;
				window.getSiblingBySelector=getSiblingBySelector;
				window.insertAfter=insertAfter;
				window.swapElements=swapElements;
				window.removeAll=removeAll;


            }(window.console));