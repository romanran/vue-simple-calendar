<script>
	import * as date from "date-fns";

	export default {
		render() {
			return this.$scopedSlots.default({
				months: [date.startOfDay(new Date())]
			});
		}
	};
</script>

<style></style>
 