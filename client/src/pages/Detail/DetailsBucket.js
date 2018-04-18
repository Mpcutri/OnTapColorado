// Portal cards
<div>
	<Card body width="100%">
	  <CardTitle>{beer.name}</CardTitle>
	  <CardText>Type: {beer.type} &#9632; ABV: {beer.abv} &#9632; IBU:{beer.ibu}</CardText>
	  <Button color="primary">Go somewhere</Button>
	</Card>
</div>

// Draggable portl cards
<DragDropContainer targetKey="foo" >
	<div>
		<Card body width="100%">
		  <CardTitle>Fast Pour</CardTitle>
		  <CardText>Type: WeiBier, collaboration w/ Bierstadt</CardText>
		  <Button color="primary">Go somewhere</Button>
		</Card>
	</div>
</DragDropContainer>

// Detais card with image
<DragDropContainer targetKey="foo" >
  <Card>
    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
    <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
      <Button>Button</Button>
    </CardBody>
  </Card>
</DragDropContainer>