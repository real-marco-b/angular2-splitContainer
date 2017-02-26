# Angular 2 Split Container Sample

Showing resizable content areas divided by a draggable splitter, based on Angular 2 quickstart sample.

Check it out live on plunker:

https://plnkr.co/edit/xynYJGqFLbJXUIhYI1sz?p=info 


## Install

```
npm Install

npm start
```


## Usage

Just put div containers into the split-container element and apply the split-behaviour directive.

The input value of the directive tells the split container how the hosting element should act:

- Use "fixed" on containers having an explicitly set width (e.g. navigation side bars)

- Use "dynamic" on containers which auto-fill the remaining available space (e.g. content)


```
    <split-container>
      <div style="width:300px;" split-behaviour="fixed">
        Link 1

        Link 2 
      </div>

      <div class="content" split-behaviour="dynamic">
        Here is my fancy content...
      </div>
    </split-container>
```
