<template >
    <div class="blog-container">
        <err_tip v-if="errModu"  :tips_content='errVal' @back_err_event="actionEvent_closeTip" />
        <blogImg>
            <span slot="blog-topFont" class="blog-topFont">於捨雜談</span>
        </blogImg>
        <div class="blogTop-bar b-layout">
            <router-link to="/">首页</router-link>
        </div>
        <blogProfile/>
        <article class="b-layout" v-if="!toggleTip">
            <blogContent
                v-for="(item, index) in blogLimits"
                :key="index"
                :content="item.blogBody"
                :artIndex="item.id"
                :tit="item.blogTitle"
                :time="item.blogCreateTime"
                :timeStamp="item.timeStamp"
                :catgory="item.blogCatgory"
                @HandlerTagName="handlerClickTagEvent"
            />
        </article>
        <p v-if="toggleTip">抱歉没有数据哦~</p>
        <div class="page-container" v-if="!blogTagShow">
            <span v-if="greaterThanOne" @click="limitBlog('prev', defaultIndex)">上一篇</span>
            <span class="page-ite">{{defaultIndex}}/{{ parseInt(allBlogNum / 6) + 1}}</span>
            <span
                v-if="defaultIndex < parseInt(allBlogNum / 6) + 1"
                @click="limitBlog('next', defaultIndex)"
            >下一篇</span>
            <span>就 {{ allBlogNum }} 篇</span>
        </div>
        <blogFoot></blogFoot>
    </div>
</template>

<script src="./index.js">

</script>

<style lang='stylus' src="./index.stylus">

</style>
